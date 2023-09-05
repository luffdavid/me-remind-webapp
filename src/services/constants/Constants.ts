let api_base = '';

if (process.env.NODE_ENV === 'production') {
  api_base = 'https://me-remind-api.onrender.com';
} else {
  api_base = 'http://localhost:3001';
}

export const DATE_TODAY = new Date().setHours(0, 0, 0, 0);

export { api_base };
