import { Request, Response } from 'express';
import { UserRepository } from '../../infra/repositories/user.repository';
import { badRequest, ok } from '../../../../shared/presentation/http-helper';
import { UserSharedRepository } from '../../../../shared/infra/repositories';
import { Profile } from '../../../../shared/domain/enums';
import { CreateUserUseCase } from '../../domain/usecases/create-user.usecase';

export class UserController {
    async createUser(req: Request, res: Response) {
        const { name, email, profile, company } = req.body;
        const password = process.env.ADMIN_PASSWORD!;
        const useCase = new CreateUserUseCase();
        const user = await useCase.execute({name,email,profile,company, password});

        if(!user){
            return badRequest(res, { success: false, error: 'Email already exists.' });
        }

        return ok(res, { success: true, data: user });
    }
}
