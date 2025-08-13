import 'dotenv/config';

import './env';
import app from './app';
import './database';

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log(`🚀 Servidor pronto em http://localhost:${process.env.SERVER_PORT || 3001}`);
});
