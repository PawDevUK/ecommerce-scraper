import { chromium } from 'playwright';
import path from 'path';
import db from './db.js';
import { decrypt } from './crypto.js';
import speakeasy from 'speakeasy';

class Scraper {
    constructor(platform) {
        this.platform = platform;
    }

    async run() {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();

        try {
            // Login
            await page.goto('https://www.amazon.com');
            await page.click('a[data-nav-role="signin"]'); // Sign in link
            await page.waitForTimeout(2000);
            await page.fill('input[name="email"]', this.platform.username);
            await page.click('input[type="submit"]');
            await page.waitForTimeout(2000);
            await page.fill('input[name="password"]', decrypt(this.platform.password, this.platform.iv));
            await page.click('input[type="submit"]');
            await page.waitForTimeout(2000);

            // Handle MFA
            if (this.platform.totp_secret) {
                const token = speakeasy.totp({
                    secret: decrypt(this.platform.totp_secret, this.platform.totp_iv),
                    encoding: 'base32'
                });
                // Assume MFA input is input[name="otpCode"] or similar
                await page.fill('input[name="otpCode"]', token);
                await page.click('input[type="submit"]');
                await page.waitForTimeout(2000);
            } else {
                // Wait for manual MFA
                console.log('Please complete MFA manually.');
                await page.waitForTimeout(30000);
            }

            // Navigate to invoices
            await page.goto('https://www.amazon.com/business/invoices');
            await page.waitForTimeout(2000);

            // Find download links
            const downloadLinks = await page.locator('a[href*="pdf"]').all();
            for (const link of downloadLinks) {
                const text = await link.textContent();
                // Assume text has date or id
                const documentId = text.trim(); // Or parse properly
                // Check if already downloaded
                const exists = db.prepare('SELECT id FROM documents WHERE platform_id = ? AND document_id = ?').get(this.platform.id, documentId);
                if (!exists) {
                    const downloadPromise = page.waitForEvent('download');
                    await link.click();
                    const download = await downloadPromise;
                    const filename = await download.suggestedFilename();
                    await download.saveAs(path.join('downloads', filename));
                    db.prepare('INSERT INTO documents (platform_id, document_id, filename) VALUES (?, ?, ?)').run(this.platform.id, documentId, filename);
                    await page.waitForTimeout(Math.random() * 3000 + 2000);
                }
            }

            // Update last sync
            db.prepare('UPDATE platforms SET last_sync = ? WHERE id = ?').run(new Date().toISOString(), this.platform.id);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            await browser.close();
        }
    }
}

export default Scraper;