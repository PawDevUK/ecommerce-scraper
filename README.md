# Fetchy - eCommerce Document Scraper

A modern full-stack application for automating invoice and document retrieval from eCommerce platforms. Built with Next.js for the frontend and TypeScript/Node.js for the backend scraper.

## 🎯 Features

### Core Functionality

- **Multi-Platform Support**: Manage credentials for multiple eCommerce platforms
- **Automated Document Retrieval**: Headless browser automation with Playwright
- **Smart Deduplication**: Prevent duplicate downloads
- **Security**: AES-256 encryption for stored credentials
- **MFA Support**: Manual or TOTP-based authentication
- **Rate Limiting**: Configurable delays to avoid detection
- **MongoDB Integration**: Secure cloud-based data storage

### Web Interface (Next.js)

- Clean, responsive UI built with React and Tailwind CSS
- Platform management dashboard
- Document history and tracking
- Invoice search and filtering

### CLI Tool

- Command-line interface for headless operation
- Batch processing capabilities
- Scheduled job support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Playwright browsers

### Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

3. **Set up environment variables:**

   ```bash
   # Create a .env.local file in the root directory
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

4. **Initialize folders:**

   ```bash
   npm run scraper init
   ```

## 💻 Usage

### Web Application

Start the development server:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to access the web interface.

### CLI Commands

**Add a new platform:**

```bash
npm run scraper add-platform "Amazon Business" "https://www.amazon.com" "your@email.com" "password" "totp_secret"
```

**List all platforms:**

```bash
npm run scraper list-platforms
```

**Run scraper for a platform:**

```bash
npm run scraper run-scraper 1
```

**Get help:**

```bash
npm run scraper help
```

## 🏗️ Project Structure

```
├── app/                          # Next.js app directory
│   ├── components/               # React components
│   │   └── button.tsx
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── lib/                          # Backend logic
│   ├── cli.ts                    # CLI interface
│   ├── scraper.ts                # Core scraper logic
│   ├── db.ts                     # Database connection
│   └── crypto.ts                 # Encryption utilities
├── public/                       # Static assets
├── downloads/                    # Downloaded documents
├── package.json                  # Dependencies
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🛠️ Technology Stack

### Frontend

- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

### Backend

- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Playwright** - Browser automation
- **MongoDB & Mongoose** - Database and ODM
- **Crypto.js** - AES-256 encryption
- **Speakeasy** - TOTP/MFA support

### Development

- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🔒 Security

- **Credential Encryption**: All stored credentials are encrypted with AES-256
- **Environment Variables**: Sensitive data stored in `.env.local`
- **Type Safety**: Full TypeScript support
- **Secure Dependencies**: Regular dependency audits

## 📝 API Reference

### CLI Flags

- `--help` - Show help information
- `--verbose` - Enable verbose logging
- `--dry-run` - Test without downloading

## 🚦 Development

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint Code

```bash
npm run lint
```

### Run Scraper CLI

```bash
npm run scraper
```

## 📋 Supported Platforms

- Amazon Business
- *(More platforms coming soon)*

## 🗺️ Roadmap

- [ ] Add support for Screwfix, RS Components
- [ ] Web dashboard for schedule management
- [ ] Email notifications for new invoices
- [ ] API endpoint for third-party integration
- [ ] Docker containerization
- [ ] Improved error handling and logging
- [ ] User authentication for web UI

## ⚠️ Disclaimer

This is a proof-of-concept tool. Use responsibly and ensure compliance with:

- Platform terms of service
- Local data protection regulations
- Fair use policies

Automated scraping may violate platform ToS. Use only for your own accounts and documents.

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Created by Pawel

---

**Last Updated**: January 2026
