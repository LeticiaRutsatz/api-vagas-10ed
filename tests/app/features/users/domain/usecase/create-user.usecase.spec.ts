import { CreateUserDTO } from '../../../../../../src/app/features/users/domain/dtos';
import { CreateUserUseCase } from '../../../../../../src/app/features/users/domain/usecases';
import { UserRepository } from '../../../../../../src/app/features/users/infra/repositories';
import { BCryptPassword } from '../../../../../../src/app/shared/adapters/crypto';
import { UserDetailDTO } from '../../../../../../src/app/shared/domain/dtos';
import { Profile } from '../../../../../../src/app/shared/domain/enums';
import { CustomError } from '../../../../../../src/app/shared/errors';
import { UserSharedRepository } from '../../../../../../src/app/shared/infra/repositories';

const createUserDTO = (): CreateUserDTO => ({
    name: 'any_name',
    email: 'any@mail.com',
    password: 'any_password',
    profile: Profile.ADMIN,
});

const createUserDetailDTO = (data: CreateUserDTO): UserDetailDTO => ({
    id: 'any_id',
    name: data.name,
    email: data.email,
    profile: data.profile,
    company: data.company,
});

describe('[Use Case] - Create User', () => {
    it('Should return error if email already exists', async () => {
        const sut = new CreateUserUseCase();

        const userDto = createUserDTO();

        jest.spyOn(UserSharedRepository.prototype, 'getUserByEmail').mockResolvedValue(
            createUserDetailDTO(userDto),
        );

        const promise = sut.execute(userDto);

        await expect(promise).rejects.toThrow(new CustomError('Email already exists'));
    });

    it('Must return user created', async () => {
        const sut = new CreateUserUseCase();

        const userDto = createUserDTO();

        jest.spyOn(UserSharedRepository.prototype, 'getUserByEmail').mockResolvedValue(undefined);

        const spySaveUser = jest
            .spyOn(UserRepository.prototype, 'saveUser')
            .mockResolvedValue(createUserDetailDTO(userDto));

        jest.spyOn(BCryptPassword.prototype, 'hashPassword').mockResolvedValue(
            'senha_criptografada',
        );

        const user = await sut.execute(userDto);

        expect(user).toEqual(createUserDetailDTO(userDto));

        expect(spySaveUser).toHaveBeenCalledWith({
            ...createUserDTO(),
            password: 'senha_criptografada',
        });
    });
});
