import { UserDetailDTO } from '../../../../shared/domain/dtos';
import { UserSharedRepository } from '../../../../shared/infra/repositories';
import { UserRepository } from '../../infra/repositories';

export class ListUsersUseCase {
    async execute(): Promise<UserDetailDTO[]> {
        const repository = new UserRepository();
        const sharedRepository = new UserSharedRepository();
        const list = await sharedRepository.getUserAll();

        return list;
    }
}
