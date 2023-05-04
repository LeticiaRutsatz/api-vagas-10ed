import { Request, Response } from "express";
import { CreateCandidateUseCase } from "../../domain/usecases/create-candidate.usecase";
import { badRequest, ok } from "../../../../shared/presentation/http-helper";
import { CustomError } from "../../../../shared/errors";
import { ListCandidateUseCase } from "../../domain/usecases/list-candidate.usecase";

export class CandidateController{

    async createCandidate(req: Request, res: Response) {
        const { name, email, profile, company, password, passwordConfirm } = req.body;
        if(password != passwordConfirm){
            return badRequest(res, { success: false, error: 'Passwords do not match' });
        }
        try {
            const useCase = new CreateCandidateUseCase();
            const user = await useCase.execute(
                { name, email, profile, company, password },
            );

            return ok(res, { success: true, data: user });
        } catch (error: any) {
            if (error instanceof CustomError) {
                return badRequest(res, { success: false, error: error.message });
            }

            throw error;
        }
    }

    async listCandidates(req: Request, res: Response){
        const useCase = new ListCandidateUseCase();
        const candidates = await useCase.execute()
        return ok(res, {success: true, data: candidates })
    }
}