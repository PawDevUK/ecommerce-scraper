import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'scraper.db');
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS platforms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    iv TEXT NOT NULL,
    totp_secret TEXT,
    totp_iv TEXT,
    last_sync TEXT
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform_id INTEGER,
    document_id TEXT NOT NULL,
    date TEXT,
    filename TEXT,
    downloaded_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (platform_id) REFERENCES platforms(id)
  );
`);

export default db;