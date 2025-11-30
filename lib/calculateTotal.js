export function calculateTotal(expenses) {
  return expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
}

// simple runtime test when used in Node
if (typeof window === 'undefined') {
  const sample = [
    { amount: 10 },
    { amount: 20.5 },
  ];
  const total = calculateTotal(sample);
  if (Math.abs(total - 30.5) > 1e-9) {
    throw new Error(`calculateTotal test failed: expected 30.5, got ${total}`);
  }
}
