import 'dotenv/config';
import '@database';
import './env';
import app from './app';

const url = process.env.DATABASE_URL || 'N/A';
console.log('DATABASE_URL at runtime:', url.replace(/:(\/\/[^:]+:)[^@]+@/, '://***:***@'));

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log(`🚀 Servidor pronto em http://localhost:${process.env.SERVER_PORT || 3001}`);
});