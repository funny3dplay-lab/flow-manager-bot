require('dotenv').config();

const path = require('path');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  telegramBotUsername: process.env.TELEGRAM_BOT_USERNAME || '',
  dbPath: process.env.DB_PATH || path.resolve(__dirname, '../../database/flow-manager.db'),
  logLevel: process.env.LOG_LEVEL || 'info',
  logFile: process.env.LOG_FILE || path.resolve(__dirname, '../../logs/app.log'),
  exportsDir: process.env.EXPORTS_DIR || path.resolve(__dirname, '../../exports'),
  importsDir: process.env.IMPORTS_DIR || path.resolve(__dirname, '../../imports'),
  backupsDir: process.env.BACKUPS_DIR || path.resolve(__dirname, '../../backups')
};
