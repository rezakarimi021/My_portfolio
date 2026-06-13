const KEY = 'product_reviews';

export const getReviews = (productId) => {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || '{}');
    return all[productId] || [];
  } catch { return []; }
};

export const addReview = (productId, review) => {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || '{}');
    const existing = all[productId] || [];
    const entry = { id: Date.now().toString(), ...review, date: new Date().toISOString() };
    all[productId] = [entry, ...existing];
    localStorage.setItem(KEY, JSON.stringify(all));
    return entry;
  } catch { return null; }
};

export const hasReviewed = (productId, username) =>
  getReviews(productId).some(r => r.username === username);
