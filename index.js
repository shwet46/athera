const express = require('express');
const { bot } = require('./telegram/bot');
const bodyParser = require('body-parser');
const { getOAuthClient } = require('./google/auth');
const { db } = require('./firebase/firebase');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});


app.get('/oauth', (req, res) => {
  const { telegram_id } = req.query;
  const oauth2Client = getOAuthClient();
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive.file'
    ],
    state: telegram_id,
    prompt: 'consent'
  });
  res.redirect(url);
});

app.get('/oauth2callback', async (req, res) => {
  const { code, state: telegram_id } = req.query;
  const oauth2Client = getOAuthClient();

  try {
    const { tokens } = await oauth2Client.getToken(code);
    await db.collection('users').doc(telegram_id).set({ tokens });

    // Notify user in Telegram
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: telegram_id,
      text: '✅ Google account connected successfully! You can now use Athera to manage your calendar, Gmail, Drive, and Docs.'
    });

    res.send('Authentication successful! You can close this tab.');
  } catch (err) {
    console.error('OAuth Error:', err);
    res.status(500).send('Authentication failed.');
  }
});

app.listen(3000, () => console.log('✅ Athera server is running on http://localhost:3000'));