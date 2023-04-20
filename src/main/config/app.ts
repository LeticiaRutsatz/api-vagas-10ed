import express from 'express';
import setupRoutes from './routes';
import setupMiddlaware from './middlawares';

const app = express();

setupMiddlaware(app);
setupRoutes(app);

export default app;
