const { Telegraf } = require('telegraf');
const { handleMessage } = require('../nlu/handler');
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => {
  const loginUrl = `http://localhost:3000/oauth?telegram_id=${ctx.from.id}`;
  ctx.reply(`👋 Welcome to Athera! To get started, please [Login with Google](${loginUrl})`, {
    parse_mode: 'Markdown'
  });
});

bot.on('text', async (ctx) => {
  const response = await handleMessage(ctx.message.text, ctx);
  ctx.reply(response);
});

module.exports = { bot };