import { Request, Response } from 'express';
import { UserRepository } from '../../infra/repositories/user.repository';
import { BCryptPassword } from '../../../../shared/adapters/crypto';
import { badRequest, ok } from '../../../../shared/presentation/http-helper';

export class UserController {
    async createUser(req: Request, res: Response) {
        const repository = new UserRepository();
        const bcrypt = new BCryptPassword();
        const { name, email, profile, company } = req.body;

        const exists = await repository.getUserByEmail(email);

        if (exists) return badRequest(res, { success: false, error: 'Email already exists.' });

        const hashPassword = await bcrypt.hashPassword(process.env.ADMIN_PASSWORD!);
        const dataUser = { name, email, profile, password: hashPassword, company };

        const user = await repository.saveUser(dataUser);
        return ok(res, { success: true, data: user });
    }
}
