import express from 'express';
import { UserController } from '../controllers';
import { createCandidateValidator, createUserValidator } from '../middlewares';
import { auth, onlyAdmin } from '../../../../shared/presentation/middlewares';
import { CandidateController } from '../controllers/candidate.controller';

export default () => {
    const router = express.Router();

    router.post('/users', auth, onlyAdmin, createUserValidator, new UserController().createUser);
    router.get('/users', auth, onlyAdmin, new UserController().listUsers);

    router.post('/candidates', createCandidateValidator, new CandidateController().createCandidate);

    return router;
};
