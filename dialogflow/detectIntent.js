const dialogflow = require('@google-cloud/dialogflow');
const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(text, sessionId) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.DIALOGFLOW_PROJECT_ID,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: 'en'
      }
    }
  };

  const responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult;
}

module.exports = { detectIntent };