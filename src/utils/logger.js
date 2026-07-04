const fs = require('fs');
const path = require('path');
const winston = require('winston');
const config = require('../config');

fs.mkdirSync(path.dirname(config.logFile), { recursive: true });

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      const details = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
      return stack
        ? `[${timestamp}] ${level.toUpperCase()}: ${message} ${details}\n${stack}`
        : `[${timestamp}] ${level.toUpperCase()}: ${message}${details}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({ all: true })
    }),
    new winston.transports.File({ filename: config.logFile })
  ]
});

module.exports = logger;
