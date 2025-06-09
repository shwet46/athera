const { NlpManager } = require('node-nlp');
const { fallbackGPT } = require('../gpt');
const { handleCalendarCommand } = require('../google/calendar');
const { handleGmailCommand } = require('../google/gmail');
const { handleDocsCommand } = require('../google/docs');
const { handleDriveCommand } = require('../google/drive');

const manager = new NlpManager({ languages: ['en'] });

(async () => {
  // Greetings & thanks
  manager.addDocument('en', 'hello', 'greet');
  manager.addDocument('en', 'hi', 'greet');
  manager.addDocument('en', 'how are you', 'greet');
  manager.addAnswer('en', 'greet', 'Hey there! 😊 How can I assist you today?');

  manager.addDocument('en', 'thank you', 'thanks');
  manager.addAnswer('en', 'thanks', 'You’re welcome! Let me know if you need anything else.');

  // Google Workspace commands
  manager.addDocument('en', 'create a note %note%', 'create_note');
  manager.addDocument('en', 'make a note %note%', 'create_note');

  manager.addDocument('en', 'schedule a meeting %details%', 'calendar_event');
  manager.addDocument('en', 'what is on my calendar', 'calendar_event');

  manager.addDocument('en', 'send email to %email%', 'send_email');
  manager.addDocument('en', 'email %email%', 'send_email');

  manager.addDocument('en', 'show my drive files', 'list_drive');
  manager.addDocument('en', 'list drive files', 'list_drive');

  // General chatbot queries
  manager.addDocument('en', 'who are you', 'about_bot');
  manager.addDocument('en', 'what can you do', 'about_bot');
  manager.addDocument('en', 'how can you help me', 'about_bot');
  manager.addAnswer('en', 'about_bot', '🤖 I’m Athera, your smart assistant! I can help with emails, meetings, notes, files, and more.');

  manager.addDocument('en', 'what time is it', 'time_now');
  manager.addDocument('en', 'what day is today', 'date_today');

  await manager.train();
  manager.save();
})();

async function handleMessage(text, userId, tokens) {
  const result = await manager.process('en', text);

  switch (result.intent) {
    case 'greet':
    case 'thanks':
    case 'about_bot':
      return result.answer;

    case 'time_now':
      return `🕒 It's ${new Date().toLocaleTimeString()}`;

    case 'date_today':
      return `📅 Today is ${new Date().toLocaleDateString()}`;

    case 'calendar_event':
      return await handleCalendarCommand(result, tokens);

    case 'send_email':
      return await handleGmailCommand(result, tokens);

    case 'create_note':
      return await handleDocsCommand(result, tokens);

    case 'list_drive':
      return await handleDriveCommand(result, tokens);

    default:
      // Fallback to GPT for open questions or small talk
      return await fallbackGPT(text, userId);
  }
}

module.exports = { handleMessage };
