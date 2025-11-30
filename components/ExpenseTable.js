export default function ExpenseTable({ items, onDelete }) {
  if (!items.length) {
    return <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>No expenses yet. Add your first one on the left.</p>;
  }

  return (
    <div style={{ maxHeight: 360, overflowY: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.35rem' }}>Date</th>
            <th style={{ textAlign: 'left', padding: '0.35rem' }}>Title</th>
            <th style={{ textAlign: 'left', padding: '0.35rem' }}>Category</th>
            <th style={{ textAlign: 'right', padding: '0.35rem' }}>Amount</th>
            <th style={{ padding: '0.35rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {items.map((e) => (
            <tr key={e.id} style={{ borderTop: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.35rem' }}>{e.date}</td>
              <td style={{ padding: '0.35rem' }}>{e.title}</td>
              <td style={{ padding: '0.35rem' }}>{e.category}</td>
              <td style={{ padding: '0.35rem', textAlign: 'right' }}>${Number(e.amount).toFixed(2)}</td>
              <td style={{ padding: '0.35rem', textAlign: 'right' }}>
                <button
                  onClick={() => onDelete(e.id)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: 9999,
                    border: 'none',
                    background: '#ef4444',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
