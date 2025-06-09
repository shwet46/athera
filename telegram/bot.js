const { Telegraf } = require('telegraf');
const { handleMessage } = require('../nlu/handler');
const { getUserTokens } = require('../utils/sessionStore');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

function escapeMarkdownV2(text) {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, '\\$&');
}

bot.start((ctx) => {
  const userId = ctx.from.id;
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const loginUrl = `${baseUrl}/oauth?telegram_id=${userId}`;

  const message = escapeMarkdownV2(`
👋 *Welcome to Athera!*  
I'm your smart assistant for Google Calendar, Gmail, Drive & Docs.

To get started:
1. Click the link below to login with Google:
`);

  const helpText = escapeMarkdownV2(`
2. Grant access to your Google Workspace account  
3. Come back and start asking questions like:
   • Schedule a meeting at 3pm tomorrow  
   • Send an email to Alex saying the report is done  
   • Show my upcoming calendar events

⚠️ You must log in once for me to access your Workspace tools!
`);

  ctx.replyWithMarkdownV2(`${message}[Login with Google](${loginUrl})\n${helpText}`)
    .catch(err => console.error('Error sending /start message:', err));
});

bot.on('text', async (ctx) => {
  try {
    const userId = ctx.from.id.toString();
    const tokens = await getUserTokens(userId);

    if (!tokens) {
      const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
      const loginUrl = `${baseUrl}/oauth?telegram_id=${userId}`;

      const intro = escapeMarkdownV2(`
🔐 *Before we start...*

Please login with Google so I can help you manage:
• Calendar & Meet  
• Gmail  
• Drive & Docs

Steps:
1. Click the link below  
2. Sign in with your Google account  
3. Grant access  
4. Come back and message me again!
`);

      await ctx.replyWithMarkdownV2(`${intro}\n[Login with Google](${loginUrl})`);
      return;
    }

    const userMessage = ctx.message.text;
    const reply = await handleMessage(userMessage, userId, tokens);
    await ctx.reply(reply);
  } catch (err) {
    console.error('Error handling message:', err);
    await ctx.reply('⚠️ Something went wrong. Try again!');
  }
});

module.exports = { bot };