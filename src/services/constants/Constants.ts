// Je nachdem, ob du dich in einer Entwicklungs- oder Produktionsumgebung befindest,
// setzt du die entsprechende API-Basis-URL.
let api_base = '';

if (process.env.NODE_ENV === 'production') {
  api_base = 'https://me-remind-api.onrender.com';
} else {
  api_base = 'http://localhost:3001';
}

export const DATE_TODAY = new Date().setHours(0, 0, 0, 0);

export { api_base };
