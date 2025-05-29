const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const sessionClient = new dialogflow.SessionsClient();

async function handleMessage(text, ctx) {
  const sessionId = uuid.v4();
  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.DIALOGFLOW_PROJECT_ID,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  return result.fulfillmentText || 'Sorry, I didn\'t understand that.';
}

module.exports = { handleMessage };