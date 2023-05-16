import { CreateUserDTO } from '../../../../../../src/app/features/users/domain/dtos';
import { CreateUserUseCase } from '../../../../../../src/app/features/users/domain/usecases';
import { UserRepository } from '../../../../../../src/app/features/users/infra/repositories';
import { Profile } from '../../../../../../src/app/shared/domain/enums';
import { CustomError } from '../../../../../../src/app/shared/errors';
import { UserSharedRepository } from '../../../../../../src/app/shared/infra/repositories';

describe('[Use Case] - Create User', () => {
    it('Must return user created', async () => {
        const sut = new CreateUserUseCase();
        const userDto: CreateUserDTO = {
            name: 'any_name',
            email: 'any@email.com',
            password: 'any_password',
            profile: Profile.ADMIN,
        };

        jest.spyOn(UserSharedRepository.prototype, 'getUserByEmail').mockResolvedValue(undefined);
        jest.spyOn(UserRepository.prototype, 'saveUser').mockResolvedValue({
            id: 'any_id',
            name: userDto.name,
            email: userDto.email,
            profile: userDto.profile,
            company: userDto.company,
        });
        const user = await sut.execute(userDto);

        expect(user).toHaveProperty('id', 'any_id');
        expect(user).not.toHaveProperty('password');
    });

    it('Should return error if email already exists', async () => {
        const sut = new CreateUserUseCase();
        const userDto: CreateUserDTO = {
            name: 'any_name',
            email: 'any@mail.com',
            password: 'any_password',
            profile: Profile.ADMIN,
        };

        jest.spyOn(UserSharedRepository.prototype, 'getUserByEmail').mockResolvedValue({
            id: 'any_id',
            name: userDto.name,
            email: userDto.email,
            profile: userDto.profile,
            company: userDto.company,
        });

        const user = sut.execute(userDto);

        await expect(user).rejects.toThrow(CustomError);
    });
});
