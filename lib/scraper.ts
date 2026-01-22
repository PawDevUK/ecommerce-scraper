import { chromium } from 'playwright';
import path from 'path';
import { decrypt } from './crypto.js';
import speakeasy from 'speakeasy';
import { Document, IPlatform } from './db.js';

class Scraper {
	platform: IPlatform;

	constructor(platform: IPlatform) {
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
					encoding: 'base32',
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
				const exists = await Document.findOne({ platform_id: this.platform._id, document_id: documentId });
				if (!exists) {
					const downloadPromise = page.waitForEvent('download');
					await link.click();
					const download = await downloadPromise;
					const filename = await download.suggestedFilename();
					await download.saveAs(path.join('downloads', filename));
					const doc = new Document({
						platform_id: this.platform._id,
						document_id,
						filename,
					});
					await doc.save();
					await page.waitForTimeout(Math.random() * 3000 + 2000);
				}
			}

			// Update last sync
			this.platform.last_sync = new Date().toISOString();
			await this.platform.save();
		} catch (error) {
			console.error('Error:', error);
		} finally {
			await browser.close();
		}
	}
}

export default Scraper;
