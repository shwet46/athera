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
