const logger = require('../utils/logger');

function loggingMiddleware(ctx, next) {
  logger.info('Incoming update', { updateType: ctx.updateType, chatId: ctx.chat?.id });
  return next();
}

function errorMiddleware(ctx, next) {
  return next().catch((error) => {
    logger.error('Middleware error', { error: error.message });
    ctx.reply('An unexpected error occurred.');
  });
}

module.exports = { loggingMiddleware, errorMiddleware };
