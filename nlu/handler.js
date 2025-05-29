const { db } = require('../firebase/firebase');
const { createNoteDoc } = require('../google/docs');
const { getTokensForUser } = require('../utils/sessionStore');

async function handleMessage(message, ctx) {
  const text = message.toLowerCase();
  const userId = ctx.from.id.toString();

  if (text.includes('note') || text.includes('remember')) {
    const noteContent = message.replace(/note|remember/gi, '').trim();
    const tokens = await getTokensForUser(userId);
    if (!tokens) return '🔒 Please login using /start first.';

    const docUrl = await createNoteDoc(tokens, noteContent);
    return `📝 Note saved! You can view it here: ${docUrl}`;
  }

  return '🤖 I did not understand that yet. Try asking me to save a note!';
}

module.exports = { handleMessage };