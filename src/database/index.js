const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const config = require('../config');
const logger = require('../utils/logger');

const dbDirectory = path.dirname(config.dbPath);
fs.mkdirSync(dbDirectory, { recursive: true });

const db = new Database(config.dbPath);
db.pragma('journal_mode = WAL');

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bot_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      payload TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  logger.info(`Database initialized at ${config.dbPath}`);
  return db;
}

module.exports = { db, initializeDatabase };
