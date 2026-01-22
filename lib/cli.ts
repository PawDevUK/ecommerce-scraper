import { Platform } from './db.js';
import { encrypt } from './crypto.js';
import Scraper from './scraper.js';
import fs from 'fs';

const args: string[] = process.argv.slice(2);
const command: string = args[0];

async function main(): Promise<void> {
	if (command === 'add-platform') {
		const name: string = args[1];
		const url: string = args[2];
		const username: string = args[3];
		const password: string = args[4];
		const totpSecret: string | undefined = args[5];
		const { encrypted: passEnc, iv: passIv } = encrypt(password);
		let totpEnc: string | null = null;
		let totpIv: string | null = null;
		if (totpSecret) {
			const { encrypted, iv } = encrypt(totpSecret);
			totpEnc = encrypted;
			totpIv = iv;
		}
		const platform = new Platform({
			name,
			url,
			username,
			password: passEnc,
			iv: passIv,
			totp_secret: totpEnc,
			totp_iv: totpIv,
		});
		await platform.save();
		console.log('Platform added');
	} else if (command === 'list-platforms') {
		const platforms = await Platform.find({}, '-password -totp_secret');
		console.log(platforms);
	} else if (command === 'run-scraper') {
		const platformId = args[1];
		const platform = await Platform.findById(platformId);
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

	process.exit(0);
}

main().catch(console.error);
