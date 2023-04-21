import { Request, Response } from 'express';
import { appDataSource } from '../../../../shared/infra/db/data-source';
import { UserEntity } from '../../../../shared/infra/db/entities';
import { UserRepository } from '../../infra/repositories/user.repository';
import { CryptoPassword } from '../../../../shared/utils/crypto';

export class UserController {
    async createUser(req: Request, res: Response) {
        const repository = new UserRepository();
        const bcrypt = new CryptoPassword();
        const { name, email, profile } = req.body;
        const exists = await repository.getUserByEmail(email);
        const hashPassword = await bcrypt.hashPassword(process.env.ADMIN_PASSWORD!);
        const newUser = { name, email, profile, password: hashPassword };

        if (!exists) await repository.saveUser(newUser);
        return res.status(200).json('ok');
    }
}
