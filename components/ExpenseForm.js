import { useState } from 'react';

const DEFAULT_CATEGORY = 'Other';

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');

  function resetForm() {
    setTitle('');
    setCategory(DEFAULT_CATEGORY);
    setAmount('');
    setDate(new Date().toISOString().slice(0, 10));
    setDescription('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    if (!amount || isNaN(Number(amount))) {
      alert('Amount must be a number');
      return;
    }

    onAdd({
      title: title.trim(),
      category: category || DEFAULT_CATEGORY,
      amount: Number(amount),
      date: date || new Date().toISOString().slice(0, 10),
      description: description.trim(),
    });

    resetForm();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem' }}>
      <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: '1.5fr 1fr' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #d1d5db' }}
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
          step="0.01"
          style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #d1d5db' }}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: '1fr 1fr' }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #d1d5db' }}
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Groceries">Groceries</option>
          <option value={DEFAULT_CATEGORY}>{DEFAULT_CATEGORY}</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #d1d5db' }}
        />
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #d1d5db', resize: 'vertical' }}
      />

      <button
        type="submit"
        style={{
          marginTop: '0.25rem',
          padding: '0.5rem 1rem',
          borderRadius: 9999,
          border: 'none',
          background: '#2563eb',
          color: 'white',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Add Expense
      </button>
    </form>
  );
}
