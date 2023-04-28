import { Request, Response } from 'express';
import { UserRepository } from '../../infra/repositories/user.repository';
import { badRequest, ok } from '../../../../shared/presentation/http-helper';
import { UserSharedRepository } from '../../../../shared/infra/repositories';
import { Profile } from '../../../../shared/domain/enums';
import { CreateUserUseCase } from '../../domain/usecases/create-user.usecase';
import { CustomError } from '../../../../shared/errors';

export class UserController {
    async createUser(req: Request, res: Response) {
        const { name, email, profile, company } = req.body;
        const userTryingToCreateAnotherProfile = req.user.profile;
        const password = process.env.ADMIN_PASSWORD!;
        try {
            const useCase = new CreateUserUseCase();
            const user = await useCase.execute({ name, email, profile, company, password, userTryingToCreateAnotherProfile });

            return ok(res, { success: true, data: user });
        } catch (error: any) {
            if (error instanceof CustomError) {
                return badRequest(res, { success: false, error: error.message });
            }

            throw error;
        }
    }
}
