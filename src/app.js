const config = require('./config');
const logger = require('./utils/logger');
const { initializeDatabase } = require('./database');
const { launchBot } = require('./bot');
const { initializeScheduler } = require('./services/scheduler');

async function main() {
  logger.info(`Starting Flow Manager Bot in ${config.env} mode`);

  initializeDatabase();
  initializeScheduler();
  await launchBot();
}

main().catch((error) => {
  logger.error('Application failed to start', { error: error.message, stack: error.stack });
  process.exit(1);
});
