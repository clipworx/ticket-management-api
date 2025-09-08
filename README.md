# Ticket Management — Backend

Backend built with **Node.js + Express + node-cron** and **Supabase** as the database.

---

## ⚡ Requirements

- Node.js v20.19.2  
- npm v10.8.2  

---

## 🔧 Installation

```bash
git clone https://github.com/clipworx/ticket-management.git
cd ticket-management
npm install
```

Create a `.env` file in the project root (use `.env.example` as reference):

```env
SUPABASE_ACCESS_TOKEN=
SUPABASE_PROJECT_ID=
SUPABASE_DB_PASSWORD=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_URL=
```

Run the server:

```bash
npm run dev
```

---

## ▶️ Usage

Backend API runs on:  
👉 http://localhost:5000/api


## ✨ Features

- **Login & Roles**
  - Secure login with **Admin** and **Contractor** roles  
  - Admins can see all tickets  
  - Contractors only see their own tickets  

- **Tickets**
  - Create, view, update, close, and renew tickets  
  - Renewal adds **+15 days** and logs the action  

- **Expiration & Alerts**
  - Scheduled job checks for expiring/expired tickets  
  - Alerts via console logs or log table  

- **Import**
  - Import sample JSON data into the system  

