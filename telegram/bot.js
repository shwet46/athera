const { Telegraf } = require('telegraf');
const { handleMessage } = require('../dialogflow/handler');
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.on('text', async (ctx) => {
  const response = await handleMessage(ctx.message.text, ctx);
  ctx.reply(response);
});

module.exports = { bot };