const config = require('../config');
const logger = require('../utils/logger');
const { db } = require('./database');
const { initializeSchema } = require('./schema');

function initializeDatabase() {
  initializeSchema(db);
  logger.info(`Database initialized at ${config.dbPath}`);
  return db;
}

module.exports = { db, initializeDatabase };
