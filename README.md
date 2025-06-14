# 📬 ReachInbox Onebox

**ReachInbox Onebox** is a smart, extensible backend service that aggregates multiple email inboxes (Gmail, Outlook, etc.) into a single searchable interface. It leverages **real-time IMAP sync**, **AI-powered classification**, and **Elasticsearch-based full-text search** to help users manage and explore their emails more intelligently.

---

## 🧠 Why This Project?

Managing multiple inboxes is hard. Searching across them is harder. And understanding what's important in each message is even worse.

**ReachInbox Onebox** solves these pain points:

- 🔁 Automatically syncs emails from multiple inboxes using IMAP.
- 🧠 Classifies emails using **OpenAI GPT** (e.g., categorize as "Invoice", "Meeting", "Reminder", etc.).
- 🔍 Makes emails **searchable by subject, sender, or content** with blazing-fast **Elasticsearch** indexing.
- ⚡ Sends Slack/webhook alerts for real-time email notifications.
- 💡 Designed for easy extension with new features like smart replies or analytics.

---

## 🚀 Features

- 📥 **Multi-account IMAP sync** — continuously fetches and indexes incoming emails.
- 🔍 **Elasticsearch-powered search** — fast, filtered search over subject, sender, and body.
- 🤖 **AI email classification** — tags emails with helpful labels using OpenAI GPT.
- 📣 **Slack/webhook notifications** — for alerting on new or categorized emails.
- ⚙️ **Modular TypeScript backend** — clean, scalable architecture.

---

## 🧰 Tech Stack

- **Node.js + TypeScript**
- **Express** – REST API backend
- **IMAPFlow** – Real-time IMAP support
- **Elasticsearch** – Search index for email data
- **OpenAI API** – Categorization via GPT
- **Slack/Webhooks** – For push notifications

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Mrakshaymehta/reachinbox-onebox.git
cd reachinbox-onebox
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env`

```env
EMAIL1_HOST=imap.gmail.com
EMAIL1_USER=your_email@gmail.com
EMAIL1_PASS=your_app_password
OPENAI_API_KEY=your_openai_api_key
```

> You can add more accounts in `src/imap/syncManager.ts`.

---

## 🧪 How It Works

1. **IMAP Sync**: `ImapFlow` connects to the inbox and listens for new messages.
2. **Email Parsing**: New messages are parsed and converted into documents.
3. **Indexing**: Emails are pushed to an `emails` index in Elasticsearch.
4. **AI Categorization**: Emails are optionally passed through OpenAI for classification.
5. **Search API**: Users can call `/api/search` with `q`, `folder`, and `account` to retrieve filtered email results.
6. **Slack Notification**: Based on custom triggers, Slack/webhooks can notify users in real-time.

---

## 📡 API Usage

### 🔍 Search Endpoint

```http
GET /api/search?q=invoice&folder=INBOX&account=your_email@gmail.com
```

- `q`: search query
- `folder`: folder like INBOX, Sent, etc.
- `account`: optional email account

Returns an array of matched email documents.

---

## 🐳 Start Elasticsearch (Local)

```bash
docker run -d -p 9200:9200 -e "discovery.type=single-node" elasticsearch:8.12.2
```

---

## 🚀 Run the App

```bash
npx nodemon --exec ts-node src/index.ts
```

> Server should run on: [http://localhost:3001](http://localhost:3001)

---

## 📌 Future Enhancements

- ✉️ RAG-based smart replies
- 📊 Email insights and dashboards
- 🏷️ User-defined labels/tags
- 🗃️ Folder-aware indexing
- 👥 User authentication and multi-tenancy

---

## 👤 Author

Built with ❤️ by [Akshay Mehta](https://github.com/Mrakshaymehta)
