# Fetchy - eCommerce Document Scraper

A modern full-stack application for automating invoice and document retrieval from eCommerce platforms. Built with Next.js 16 for the frontend and TypeScript/Node.js for the backend scraper. This project demonstrates end-to-end implementation of web scraping with secure credential management and a responsive user interface.

**Repository**: [github.com/PawDevUK/ecommerce-scraper](https://github.com/PawDevUK/ecommerce-scraper)  
**Live Demo**: Coming soon (deploying to Vercel)

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

- Clean, responsive UI built with React 19 and Tailwind CSS
- Enhanced navigation with mobile menu and dropdown functionality
- Platform management dashboard
- Document history and tracking
- Invoice search and filtering
- Fully responsive design for desktop and mobile devices

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
│   │   ├── button.tsx           # Reusable button component
│   │   └── Navigation.tsx       # Enhanced navigation with mobile/dropdown
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout with navigation
│   └── globals.css               # Global styles and Tailwind config
├── lib/                          # Backend logic
│   ├── cli.ts                    # CLI interface
│   ├── scraper.ts                # Core scraper logic with Playwright
│   ├── db.ts                     # MongoDB/Mongoose models and connection
│   └── crypto.ts                 # AES-256 encryption utilities
├── public/                       # Static assets
├── downloads/                    # Downloaded documents storage
│   └── sample-amazon-invoice.html # Example invoice
├── package.json                  # Dependencies and scripts
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs             # ESLint configuration
├── postcss.config.mjs            # PostCSS configuration
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
- **Environment Variables**: Sensitive data stored in `.env.local` (not tracked in git)
- **Type Safety**: Full TypeScript support for compile-time error detection
- **Secure Dependencies**: Regular dependency audits with npm
- **Interface Exports**: Proper TypeScript interface exports for type checking

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

### In Progress

- [ ] Vercel deployment and live demo
- [ ] Enhanced welcome page with platform overview and call-to-action

### Frontend Development

- [ ] Complete Navigation component styling and responsiveness
- [ ] Build authentication pages (Sign In/Sign Up) with form validation
- [ ] Create platform-specific pages (Amazon Business, Screwfix, RS Components, etc.)
- [ ] Implement invoice fetching UI with input forms and loading states
- [ ] Design results display for fetched invoices with proper formatting
- [ ] Add error handling and user feedback components
- [ ] Integrate API endpoints for backend communication
- [ ] Polish global styles and add consistent theming

### Backend & Features

- [ ] Add support for Screwfix, RS Components
- [ ] Web dashboard for schedule management
- [ ] Email notifications for new invoices
- [ ] API endpoint for third-party integration
- [ ] Docker containerization
- [ ] Improved error handling and logging
- [ ] User authentication for web UI

### Completed ✅

- [x] Initial Next.js project setup with TypeScript
- [x] MongoDB integration with Mongoose
- [x] Core scraper logic with Playwright
- [x] Credential encryption with AES-256
- [x] Navigation component with mobile menu and dropdown
- [x] Responsive layout styling
- [x] TypeScript declarations for CSS modules
- [x] CLI interface for scraper operations

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
GitHub: [@PawDevUK](https://github.com/PawDevUK)

---

**Last Updated**: January 23, 2026
