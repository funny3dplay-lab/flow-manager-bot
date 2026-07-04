const { db } = require('./database');

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_code TEXT UNIQUE NOT NULL,
    email TEXT,
    password TEXT,
    secret_2fa TEXT,
    start_date TEXT,
    duration_months INTEGER,
    current_month INTEGER,
    remaining_months INTEGER,
    update_day INTEGER,
    chrome_profile TEXT,
    status TEXT DEFAULT 'active',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );`,
  `CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    telegram_id TEXT,
    whatsapp TEXT,
    account_code TEXT,
    invited_month INTEGER,
    invite_date TEXT,
    notes TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS settings (
    "key" TEXT PRIMARY KEY,
    "value" TEXT
  );`
];

function initializeSchema(connection = db) {
  connection.exec(schemaStatements.join('\n'));
  return connection;
}

module.exports = { schemaStatements, initializeSchema };
