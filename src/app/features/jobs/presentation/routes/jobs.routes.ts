import express from 'express';
import { auth } from '../../../../shared/presentation/middlewares';
import { applyJobValidator, createJobValidator } from '../middlewares';
import { CandidateJobController, JobsController } from '../controllers';

export default () => {
    const router = express.Router();

    router.post('/jobs', auth, createJobValidator, new JobsController().createJob);
    router.post('/jobs/:id/apply', auth, applyJobValidator, new CandidateJobController().apply);

    return router;
};
