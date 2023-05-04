import { Request, Response } from 'express';
import { CreateJobUseCase } from '../../domain/usecases/create-job.usecase';
import { badRequest, ok } from '../../../../shared/presentation/http-helper';

export class JobsController {
    async createJob(req: Request, res: Response) {
        const { description, limitDate, maxCandidate } = req.body;
        const useCase = new CreateJobUseCase();

        try {
            const auth = req.user;

            const job = await useCase.execute({ description, limitDate, maxCandidate }, auth);

            return ok(res, { success: true, data: job });
        } catch (error: any) {
            return badRequest(res, { success: false, error: error.message });
        }
    }
}
