# 🤖 Athera - Your AI Telegram Assistant

Athera is a smart Telegram bot that helps users manage their work through natural language using **Google Workspace APIs**, **Node.js NLP (NodeNLP)**, and **Firebase**.

---

## 🌟 Features

* 🔐 Google Sign-In via Telegram
* 💬 NLP-powered smart conversations via NodeNLP
* 🗕️ Schedule Google Calendar + Meet events
* 📧 Send Gmail emails (with user confirmation)
* 🗓️ View calendar events and meetings
* 📄 Access and upload Google Drive files
* 📝 Create and store Google Docs as Notes
* 📥 Read Gmail inbox for recent messages
* 🧠 Multiple user support with Firestore
* 🔗 Fully integrated OAuth2 flow

---

## 💠 Tech Stack

* **Node.js** + **Express** for backend server
* **Firebase (Firestore)** for user and token storage
* **Google Workspace APIs** (Calendar, Gmail, Drive, Docs)
* **NodeNLP** for natural language understanding
* **Telegraf** for Telegram Bot API
* **Ngrok** for local development webhook

---

## 📂 Project Structure

```
athera-bot/
├── .env                           # Environment variables
├── index.js                       # Express server + webhook + OAuth
├── telegram/bot.js                # Telegram bot logic
├── firebase/firebase.js           # Firestore DB connection
├── google/
│   ├── auth.js                    # Google OAuth2 setup
│   ├── calendar.js                # Calendar + Meet logic
│   ├── gmail.js                   # Gmail read/send
│   ├── drive.js                   # Drive access
│   └── docs.js                    # Docs API to create notes
├── nlu/
│   └── handler.js                 # NodeNLP handler for user messages
└── utils/
    └── sessionStore.js           # Firestore-based session/token utils
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shwet46/athera.git
cd athera
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```env
TELEGRAM_TOKEN=your_telegram_bot_token
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

---

## 🔐 Google OAuth Setup

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable APIs:
   - **Gmail API**
   - **Google Calendar API**
   - **Google Drive API**
   - **Google Docs API**
3. Configure **OAuth Consent Screen**
4. Add this redirect URI:  
   `http://localhost:3000/oauth2callback`

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and enable **Firestore**
3. Go to **Project Settings → Service Accounts → Generate new private key**
4. Copy the key data into `.env` file

---

## 🤖 Telegram Bot Setup

1. Talk to [@BotFather](https://t.me/botfather)
2. Create a new bot and get the **Bot Token**
3. Add the token to `.env` as `TELEGRAM_TOKEN`

---

## 🔀 Ngrok Setup for Local Testing

Install and run:

```bash
npm install -g ngrok
ngrok http 3000
```

Then set Telegram webhook:

```bash
curl -F "url=https://<ngrok-id>.ngrok.io/webhook" https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook

or

Invoke-WebRequest -Method Post -Uri "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" -Body @{url="https://1a2b3c4d5e6f.ngrok.io/webhook"}
```

---

## 🧠 NLP via NodeNLP

Athera uses [NodeNLP](https://www.npmjs.com/package/node-nlp) to interpret messages like:

```
create a note to follow up with client
schedule a meeting next Monday at 10am
send an email to jane@example.com saying meeting moved
what’s on my calendar this week?
```

---

## ▶️ Run the Project

```bash
npm start
```

---

## ✍️ Example Prompts

```
🗓️ schedule a meeting tomorrow at 2pm
📧 send email to john@xyz.com saying task is done
📄 save a note: remember to update the report
📥 check my latest Gmail inbox
📁 show my recent Google Drive files
```

---
