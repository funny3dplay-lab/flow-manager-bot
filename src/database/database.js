const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const config = require('../config');
const logger = require('../utils/logger');

const dbDirectory = path.dirname(config.dbPath);
fs.mkdirSync(dbDirectory, { recursive: true });

const db = new Database(config.dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

logger.info(`Database connection opened at ${config.dbPath}`);

module.exports = { db };
