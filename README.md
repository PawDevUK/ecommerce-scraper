# eCommerce Document Scraper

A proof-of-concept application for automating document retrieval from eCommerce platforms.

## Features

- Platform management (add/edit/remove credentials)
- Automated login with headless browser
- Document download with duplicate prevention
- Rate limiting and random delays
- MFA support (manual or TOTP)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

3. Set up MongoDB Atlas (cloud MongoDB) and set MONGODB_URI environment variable, or update the URI in db.js

4. Initialize the folders:

   ```bash
   npm run scraper init
   ```

## Usage

### Add a Platform

```bash
npm run scraper add-platform "Amazon Business" "https://www.amazon.com" "your@email.com" "password" "totp_secret_optional"
```

### List Platforms

```bash
npm run scraper list-platforms
```

### Run Scraper for a Platform

```bash
npm run scraper run-scraper 1
```

## Architecture

- **Database**: MongoDB Atlas (cloud) with Mongoose ODM
- **Encryption**: AES-256 for credentials
- **Automation**: Playwright for browser control
- **MFA**: Speakeasy for TOTP
- **Language**: TypeScript for type safety

## Next Steps

- Add more platforms (Screwfix, RS Components, etc.)
- Implement API for integration
- Add scheduled runs
- Improve error handling and logging

## Disclaimer

This is a proof-of-concept. Use responsibly and in accordance with platform terms of service.
