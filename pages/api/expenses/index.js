import { readDb, writeDb, generateId } from '../../../../lib/fileDb';

export default async function handler(req, res) {
  const db = await readDb();

  if (req.method === 'GET') {
    // basic GET: return all expenses sorted by date desc
    const items = (db.expenses || []).slice().sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
    res.status(200).json(items);
    return;
  }

  if (req.method === 'POST') {
    const { title, category, amount, date, description } = req.body || {};
    if (!title || !amount || !date) {
      res.status(400).json({ message: 'title, amount and date are required' });
      return;
    }

    const item = {
      id: generateId(),
      title: String(title),
      category: category || 'Other',
      amount: Number(amount),
      date: String(date),
      description: description ? String(description) : '',
    };

    db.expenses = db.expenses || [];
    db.expenses.push(item);
    await writeDb(db);
    res.status(201).json(item);
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
