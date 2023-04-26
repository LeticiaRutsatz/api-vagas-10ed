import express, { Express } from 'express';
import userRoutes from '../../app/features/users/presentation/routes/user.routes';
import loginRoutes from '../../app/features/authentication/presentation/routes/auth.routes';


export default (app: Express) => {
    app.get('/', (req, res) => res.status(200).json('API is runnig...'));
    app.use(userRoutes());
    app.use(loginRoutes())
};
