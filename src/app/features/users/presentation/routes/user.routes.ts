import express from 'express';
import { UserController } from '../controllers';
import { createUserValidator } from '../middlewares';

export default () => {
    const router = express.Router();

    router.post('/users', createUserValidator, new UserController().createUser);

    return router;
};
