import { ListUsersUseCase } from '../../../../../../src/app/features/users/domain/usecases/list-users.usecase';
import { UserDetailDTO } from '../../../../../../src/app/shared/domain/dtos';
import { Profile } from '../../../../../../src/app/shared/domain/enums';
import { UserSharedRepository } from '../../../../../../src/app/shared/infra/repositories';

describe('[Use Case] - List Users', () => {
    it('Should return a empty list', async () => {
        jest.spyOn(UserSharedRepository.prototype, 'getUserAll').mockResolvedValueOnce([]);

        const sut = new ListUsersUseCase();

        const users = await sut.execute();

        expect(users).toHaveLength(0);
    });

    it('List all users with 1 user.', async () => {
        const userDto: UserDetailDTO = {
            id: 'any_id',
            name: 'any_name',
            email: 'any@email.com',
            profile: Profile.ADMIN,
        };

        jest.spyOn(UserSharedRepository.prototype, 'getUserAll').mockResolvedValueOnce([userDto]);
        const sut = new ListUsersUseCase();

        const users = await sut.execute();

        expect(users).toHaveLength(1);
    });
});
