import { Request, Response } from 'express';
import { ApplyJobUseCase } from '../../domain/usecases/apply-job.usecase';

export class CandidateJobController {
    async apply(req: Request, res: Response) {
        const { idJob } = req.query;

        const useCase = new ApplyJobUseCase();

        await useCase.execute(idJob as string, req.user.id);

        return res.status(200).json('ok');
    }
}
