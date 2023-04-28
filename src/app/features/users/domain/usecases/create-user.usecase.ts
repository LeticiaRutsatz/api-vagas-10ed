import { profile } from 'console';
import { BCryptPassword } from '../../../../shared/adapters/crypto';
import { UserDetailDTO } from '../../../../shared/domain/dtos';
import { UserSharedRepository } from '../../../../shared/infra/repositories';
import { UserRepository } from '../../infra/repositories';
import { CreateUserDTO } from '../dtos';
import { Profile } from '../../../../shared/domain/enums';
import { CustomError } from '../../../../shared/errors';

export class CreateUserUseCase {
    async execute(createUserDTO: CreateUserDTO): Promise<UserDetailDTO> {
        if (createUserDTO.userTryingToCreateAnotherProfile !== Profile.ADMIN) {
            throw new CustomError('User is not ADMIN');
        }
        const repository = new UserRepository();
        const sharedRepository = new UserSharedRepository();
        const exists = await sharedRepository.getUserByEmail(createUserDTO.email);

        if (exists) throw new CustomError('Email already exists');

        const bcrypt = new BCryptPassword();

        const hashPassword = await bcrypt.hashPassword(createUserDTO.password);

        const dto = Object.assign(createUserDTO, { password: hashPassword });

        const user = await repository.saveUser(dto);

        return user;
    }
}
