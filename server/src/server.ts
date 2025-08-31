import 'dotenv/config';
import './database';
import './env';
import app from './app';

const url = process.env.DATABASE_URL || 'N/A';
console.log(
  'DATABASE_URL at runtime:',
  url.replace(/:(\/\/[^:]+:)[^@]+@/, '://***:***@'),
);

const PORT = process.env.SERVER_PORT || 3005;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Servidor pronto em 0.0.0.0:${PORT}`);
});
