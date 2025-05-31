require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const { bot } = require('./telegram/bot');
const { getOAuthClient } = require('./google/auth');
const { db } = require('./firebase/firebase');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

app.get('/oauth', (req, res) => {
  const { telegram_id } = req.query;

  if (!telegram_id) return res.status(400).send('Missing Telegram ID');

  const oauth2Client = getOAuthClient();
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    state: telegram_id,
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive.file'
    ]
  });

  res.redirect(url);
});

app.get('/oauth2callback', async (req, res) => {
  const { code, state: telegram_id } = req.query;

  if (!code || !telegram_id) return res.status(400).send('Missing code or Telegram ID');

  const oauth2Client = getOAuthClient();

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    await db.collection('users').doc(telegram_id).set({ tokens });

    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: telegram_id,
      text: '✅ Google account connected successfully! You can now use Athera to manage your calendar, Gmail, Drive, and Docs.'
    });

    res.send('✅ Authentication successful! You can close this tab.');
  } catch (err) {
    console.error('❌ OAuth Error:', err.response?.data || err.message);
    res.status(500).send('Authentication failed.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Athera server is running on http://localhost:${PORT}`);
});