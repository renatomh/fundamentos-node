import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();
app.use(express.json());
// Habilitando a utilização da API para aplicações em React, etc.
// Deve vir antes da utilizaçã odas rotas
app.use(cors());
app.use(routes);

export default app;
