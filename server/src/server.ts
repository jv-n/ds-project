import 'dotenv/config';
import './database';
import './env';
import app from './app';

const url = process.env.DATABASE_URL || 'N/A';
console.log('DATABASE_URL at runtime:', url.replace(/:(\/\/[^:]+:)[^@]+@/, '://***:***@'));

app.listen(process.env.SERVER_PORT || 3005, () => {
  console.log(`🚀 Servidor pronto em localhost:${process.env.SERVER_PORT || 3005}`);
});
