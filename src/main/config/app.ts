import express from 'express';
import setupRoutes from './routes';
import setupMiddlaware from './middlawares';

const app = express();

setupRoutes(app);
setupMiddlaware(app);

export default app;
