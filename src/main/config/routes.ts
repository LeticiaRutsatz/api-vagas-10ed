import express, { Express } from 'express';
import userRoutes from "../../app/features/users/presentation/routes/user.routes"

export default (app: Express) => {
    app.get('/', (req, res) => res.status(200).json('API is runnig...'));
    app.use(userRoutes());
};
