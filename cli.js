import db from './db.js';
import { encrypt } from './crypto.js';
import Scraper from './scraper.js';
import fs from 'fs';

const args = process.argv.slice(2);
const command = args[0];

if (command === 'add-platform') {
    const name = args[1];
    const url = args[2];
    const username = args[3];
    const password = args[4];
    const totpSecret = args[5] || null;
    const { encrypted: passEnc, iv: passIv } = encrypt(password);
    let totpEnc = null;
    let totpIv = null;
    if (totpSecret) {
        const { encrypted, iv } = encrypt(totpSecret);
        totpEnc = encrypted;
        totpIv = iv;
    }
    db.prepare('INSERT INTO platforms (name, url, username, password, iv, totp_secret, totp_iv) VALUES (?, ?, ?, ?, ?, ?, ?)').run(name, url, username, passEnc, passIv, totpEnc, totpIv);
    console.log('Platform added');
} else if (command === 'list-platforms') {
    const platforms = db.prepare('SELECT id, name, url, username FROM platforms').all();
    console.log(platforms);
} else if (command === 'run-scraper') {
    const platformId = args[1];
    const platform = db.prepare('SELECT * FROM platforms WHERE id = ?').get(platformId);
    if (platform) {
        const scraper = new Scraper(platform);
        await scraper.run();
    } else {
        console.log('Platform not found');
    }
} else if (command === 'init') {
    if (!fs.existsSync('downloads')) {
        fs.mkdirSync('downloads');
    }
    console.log('Initialized');
} else {
    console.log('Commands: add-platform <name> <url> <username> <password> [totp_secret], list-platforms, run-scraper <id>, init');
}