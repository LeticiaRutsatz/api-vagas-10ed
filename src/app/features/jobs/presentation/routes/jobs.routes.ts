import express from 'express';
import { auth } from '../../../../shared/presentation/middlewares';
import { createJobValidator } from '../middlewares';
import { JobsController } from '../controllers';

export default () => {
    const router = express.Router();

    router.post('/jobs', createJobValidator, new JobsController().createJob);

    return router;
};