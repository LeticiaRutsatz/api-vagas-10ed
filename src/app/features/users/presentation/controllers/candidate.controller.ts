import { Request, Response } from 'express';
import { CreateCandidateUseCase } from '../../domain/usecases';
import { badRequest, ok } from '../../../../shared/presentation/http-helper';
import { CustomError } from '../../../../shared/errors';
import { Profile } from '../../../../shared/domain/enums';

export class CandidateController {
    async createCandidate(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const useCase = new CreateCandidateUseCase();

            const user = await useCase.execute({
                name,
                email,
                profile: Profile.CANDIDATE,
                password,
            });

            return ok(res, { success: true, data: user });
        } catch (error: any) {
            if (error instanceof CustomError) {
                return badRequest(res, { success: false, error: error.message });
            }

            throw error;
        }
    }
}
