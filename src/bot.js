const { Telegraf } = require('telegraf');
const config = require('./config');
const logger = require('./utils/logger');
const { startCommand } = require('./commands/start');
const { loggingMiddleware, errorMiddleware } = require('./middleware');

function createBot() {
  if (!config.telegramBotToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is not configured. Please set it in your environment variables.');
  }

  const bot = new Telegraf(config.telegramBotToken);

  bot.use(loggingMiddleware);
  bot.use(errorMiddleware);

  bot.start(startCommand);
  bot.help((ctx) => {
    ctx.reply('Flow Manager Bot is ready. More commands will be added soon.');
  });

  bot.catch((err, ctx) => {
    logger.error('Telegraf error', { error: err.message, update: ctx.updateType });
  });

  return bot;
}

async function launchBot() {
  const bot = createBot();
  await bot.launch();

  logger.info(`Telegram bot launched successfully as @${config.telegramBotUsername || 'flow-manager-bot'}`);

  const shutdown = async (signal) => {
    logger.info(`Received ${signal}. Stopping bot...`);
    await bot.stop(signal);
    process.exit(0);
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));

  return bot;
}

module.exports = { createBot, launchBot };
