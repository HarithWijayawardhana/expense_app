import { readDb, writeDb } from '../../../../lib/fileDb';

export default async function handler(req, res) {
  const { id } = req.query;
  const db = await readDb();
  const expenses = db.expenses || [];
  const idx = expenses.findIndex((e) => e.id === String(id));

  if (idx === -1) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  if (req.method === 'DELETE') {
    const removed = expenses.splice(idx, 1)[0];
    db.expenses = expenses;
    await writeDb(db);
    res.status(200).json({ success: true, removed });
    return;
  }

  if (req.method === 'PUT') {
    const payload = req.body || {};
    expenses[idx] = { ...expenses[idx], ...payload };
    db.expenses = expenses;
    await writeDb(db);
    res.status(200).json(expenses[idx]);
    return;
  }

  res.setHeader('Allow', ['DELETE', 'PUT']);
  res.status(405).end('Method Not Allowed');
}
