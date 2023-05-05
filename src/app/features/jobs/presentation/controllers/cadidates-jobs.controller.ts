import { Request, Response } from 'express';
import { ApplyJobUseCase } from '../../domain/usecases/apply-job.usecase';
import { badRequest, ok } from '../../../../shared/presentation/http-helper';

export class CandidateJobController {
    async apply(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const useCase = new ApplyJobUseCase();

            const candidateJobApplied = await useCase.execute(id as string, req.user.id);

            return ok(res, { success: true, data: candidateJobApplied });
        } catch (error: any) {
            return badRequest(res, { success: false, error: error.message });
        }
    }
}
