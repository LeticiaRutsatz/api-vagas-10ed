import express from 'express';
import { UserController } from '../controllers';
import { createUserValidator } from '../middlewares';
import { auth } from '../../../../shared/presentation/middlewares';

export default () => {
    const router = express.Router();

    router.post('/users', auth, createUserValidator, new UserController().createUser);

    return router;
};
