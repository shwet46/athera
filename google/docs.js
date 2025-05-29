const { google } = require('googleapis');
const { getOAuthClient } = require('./auth');

async function createNoteDoc(tokens, content) {
  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials(tokens);

  const docs = google.docs({ version: 'v1', auth: oauth2Client });
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const doc = await docs.documents.create({
    requestBody: {
      title: 'Athera Note '
    }
  });

  await docs.documents.batchUpdate({
    documentId: doc.data.documentId,
    requestBody: {
      requests: [
        {
          insertText: {
            text: content,
            location: { index: 1 }
          }
        }
      ]
    }
  });

  const file = await drive.files.get({
    fileId: doc.data.documentId,
    fields: 'webViewLink'
  });

  return file.data.webViewLink;
}

module.exports = { createNoteDoc };