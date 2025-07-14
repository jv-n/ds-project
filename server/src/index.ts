import express from 'express';
import empresaRoutes from './routes/empresasRoutes';

const app = express();

app.use(express.json());  // obrigatório para POST e PUT

app.get('/', (_req, res) => {
  res.send('Welcome to Express server');
});

app.use('/api/empresas', empresaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
