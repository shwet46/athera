const { google } = require('googleapis');

async function sendEmail(auth, to, subject, message) {
  const gmail = google.gmail({ version: 'v1', auth });
  const email = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    'Subject: ' + subject,
    '',
    message,
  ].join('\n');

  const encodedMessage = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: encodedMessage },
  });

  return res.data;
}

module.exports = { sendEmail };