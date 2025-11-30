import { useEffect, useMemo, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import { calculateTotal } from '../lib/calculateTotal';

function generateIdFallback() {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function loadExpenses() {
    try {
      setLoading(true);
      const res = await fetch('/api/expenses');
      if (!res.ok) throw new Error('Failed to load expenses');
      const data = await res.json();
      setExpenses(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const total = useMemo(() => calculateTotal(expenses), [expenses]);

  const filteredExpenses = useMemo(
    () =>
      expenses.filter((e) => {
        const q = filterQuery.trim().toLowerCase();
        if (!q) return true;
        return (
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          (e.description || '').toLowerCase().includes(q)
        );
      }),
    [expenses, filterQuery]
  );

  async function handleAdd(expense) {
    try {
      setSaving(true);
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });

      if (!res.ok) {
        // fallback: still update UI so UX is not broken in dev
        const fallback = { ...expense, id: generateIdFallback() };
        setExpenses((prev) => [fallback, ...prev]);
        return;
      }

      const created = await res.json();
      setExpenses((prev) => [created, ...prev]);
    } catch (err) {
      console.error(err);
      const fallback = { ...expense, id: generateIdFallback() };
      setExpenses((prev) => [fallback, ...prev]);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this expense?')) return;
    try {
      await fetch('/api/expenses/' + id, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    } finally {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    }
  }

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        minHeight: '100vh',
        margin: 0,
        padding: '1.5rem',
        background: '#f3f4f6',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '1.5rem',
        }}
      >
        <header>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Expense Tracker</h1>
          <p style={{ color: '#4b5563' }}>Add, remove, and search your daily expenses.</p>
        </header>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '1rem 1.25rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <h2 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Add Expense</h2>
            <ExpenseForm onAdd={handleAdd} />

            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Summary</h3>
              <p style={{ margin: 0, color: '#374151' }}>
                Total: <strong>${total.toFixed(2)}</strong> ({expenses.length} items)
              </p>
              {saving && (
                <p style={{ margin: 0, marginTop: '0.25rem', color: '#6b7280', fontSize: '0.8rem' }}>
                  Saving expense...
                </p>
              )}
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: '1rem 1.25rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <h2 style={{ fontWeight: 600 }}>Expenses</h2>
              <input
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search title, category..."
                style={{
                  flex: 1,
                  maxWidth: 260,
                  padding: '0.4rem 0.6rem',
                  borderRadius: 9999,
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            {loading ? (
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Loading expenses...</p>
            ) : error ? (
              <p style={{ color: '#b91c1c', fontSize: '0.9rem' }}>{error}</p>
            ) : (
              <ExpenseTable items={filteredExpenses} onDelete={handleDelete} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
