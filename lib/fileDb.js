import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    const init = { expenses: [] };
    await fs.writeFile(DB_PATH, JSON.stringify(init, null, 2));
    return init;
  }
}

export async function writeDb(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

export function generateId() {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}
