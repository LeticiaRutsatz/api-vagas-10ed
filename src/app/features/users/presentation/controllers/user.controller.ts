import { Request, Response } from 'express';
import { UserRepository } from '../../infra/repositories/user.repository';
import { BCryptPassword } from '../../../../shared/adapters/crypto';
import { badRequest, ok } from '../../../../shared/presentation/http-helper';
import { UserSharedRepository } from '../../../../shared/infra/repositories';
import { Profile } from '../../../../shared/domain/enums';

export class UserController {
    async createUser(req: Request, res: Response) {
        console.log(req.user);

        if (req.user.profile !== Profile.ADMIN) {
            return badRequest(res, { success: false, error: 'User is not ADMIN' });
        }
        const repository = new UserRepository();
        const sharedRepository = new UserSharedRepository();
        const bcrypt = new BCryptPassword();
        const { name, email, profile, company } = req.body;

        const exists = await sharedRepository.getUserByEmail(email);

        if (exists) return badRequest(res, { success: false, error: 'Email already exists.' });

        const hashPassword = await bcrypt.hashPassword(process.env.ADMIN_PASSWORD!);
        const dataUser = { name, email, profile, password: hashPassword, company };

        const user = await repository.saveUser(dataUser);
        return ok(res, { success: true, data: user });
    }
}
