import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "wedding.db");
const db = new Database(dbPath);

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS registration_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE NOT NULL,
    guest_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_used INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE NOT NULL,
    guest_name TEXT NOT NULL,
    phone TEXT,
    guests_count INTEGER DEFAULT 1,
    dietary_restrictions TEXT,
    message TEXT,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (token) REFERENCES registration_links(token)
  );
`);

export default db;
