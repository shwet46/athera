const express = require('express');
const { bot } = require('./telegram/bot');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server is running on port 3000'));