import express from 'express'
import { UserController } from '../controllers';

export default () => {
    const router = express.Router();

    router.post('/users', new UserController().createUser);
    
    return router;
}
