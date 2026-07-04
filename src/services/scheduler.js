const cron = require('node-cron');
const logger = require('../utils/logger');

function initializeScheduler() {
  cron.schedule('0 * * * *', () => {
    logger.info('Scheduler tick: hourly maintenance task placeholder');
  });

  logger.info('Scheduler initialized');
}

module.exports = { initializeScheduler };
