import express from 'express';
import { UserController } from '../controllers';
import { createUserValidator } from '../middlewares';
import { auth } from '../../../../shared/presentation/middlewares';
import { CandidateController } from '../controllers/candidate.controller';
import { permission } from '../middlewares/perrmiss.middlewares';

export default () => {
    const router = express.Router();

    router.post('/users', auth, createUserValidator, new UserController().createUser);
    router.get('/users', auth, permission, new UserController().listUsers);

    router.post('/candidates', createUserValidator, new CandidateController().createCandidate);
    router.get('/candidates', auth, permission, new CandidateController().listCandidates);

    return router;
};
