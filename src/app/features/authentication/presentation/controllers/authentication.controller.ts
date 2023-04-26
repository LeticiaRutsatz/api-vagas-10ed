import { Request, Response } from 'express';
import { BCryptPassword } from '../../../../shared/adapters/crypto';
import { UserSharedRepository } from '../../../../shared/infra/repositories';
import { ok, unauthorized } from '../../../../shared/presentation/http-helper';

export class AuthenticationController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const repository = new UserSharedRepository();
        const bcrypt = new BCryptPassword();

        const user = await repository.getUserByEmail(email, {
            withPassword: true,
        });

        if (!user) {
            return unauthorized(res, { success: false, error: 'Incorret email or password.' });
        }

        const correctPassword = await bcrypt.comparePassword(password, user.password as string);

        if (!correctPassword) {
            return unauthorized(res, { success: false, error: 'Incorret  a email or password.' });
        }
        return ok(res, { success: true, data: user });
    }
}
