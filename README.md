# Expense Tracker (Next.js + File-based API)

Simple expense tracker built with Next.js (Pages Router), React state, and a file-based JSON database
for persistence during development.

## Features

- Add expenses (title, category, amount, date, description)
- Delete expenses
- Search/filter by text
- Shows total amount and count of expenses
- Data is stored in `data/db.json` through Next.js API routes:
  - `GET /api/expenses`
  - `POST /api/expenses`
  - `DELETE /api/expenses/:id`
  - `PUT /api/expenses/:id` (not yet used by the UI, but ready for editing support)

> Note: File-based persistence works great in local dev or on a VPS, but **not on serverless platforms like Vercel**.
> For deployment there, replace `lib/fileDb.js` with a real DB (MongoDB / PostgreSQL / etc.). I can help you do that.

## How to run

```bash
npm install
npm run dev
# then open http://localhost:3000
```

Expenses you add will be saved in `data/db.json` and survive page reloads.
