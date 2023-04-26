import express from 'express';
import { loginValidation } from '../middlewares';
import { AuthenticationController } from '../controllers';

export default () => {
    const router = express.Router();

    router.post('/login', loginValidation, new AuthenticationController().login);

    return router;
};
