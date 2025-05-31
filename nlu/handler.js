const { NlpManager } = require('node-nlp');
const { handleCalendarCommand } = require('../google/calendar');
const { handleGmailCommand } = require('../google/gmail');
const { handleDocsCommand } = require('../google/docs');
const { handleDriveCommand } = require('../google/drive');

const manager = new NlpManager({ languages: ['en'] });

(async () => {
  manager.addDocument('en', 'hello', 'greet');
  manager.addDocument('en', 'hi', 'greet');
  manager.addDocument('en', 'how are you', 'greet');
  manager.addAnswer('en', 'greet', 'Hey there! 😊 How can I assist you today?');

  manager.addDocument('en', 'thank you', 'thanks');
  manager.addAnswer('en', 'thanks', 'You’re welcome! Let me know if you need anything else.');

  manager.addDocument('en', 'create a note %note%', 'create_note');
  manager.addDocument('en', 'make a note %note%', 'create_note');

  manager.addDocument('en', 'schedule a meeting %details%', 'calendar_event');
  manager.addDocument('en', 'what is on my calendar', 'calendar_event');

  manager.addDocument('en', 'send email to %email%', 'send_email');
  manager.addDocument('en', 'email %email%', 'send_email');

  manager.addDocument('en', 'show my drive files', 'list_drive');
  manager.addDocument('en', 'list drive files', 'list_drive');

  await manager.train();
})();

async function handleMessage(text, userId, tokens) {
  const result = await manager.process('en', text);

  switch (result.intent) {
    case 'greet':
    case 'thanks':
      return result.answer;

    case 'calendar_event':
      return await handleCalendarCommand(result, tokens);

    case 'send_email':
      return await handleGmailCommand(result, tokens);

    case 'create_note':
      return await handleDocsCommand(result, tokens);

    case 'list_drive':
      return await handleDriveCommand(result, tokens);

    default:
      return "🤖 I'm not sure how to help with that yet. Try commands like 'schedule a meeting' or 'send email to someone'.";
  }
}

module.exports = { handleMessage };