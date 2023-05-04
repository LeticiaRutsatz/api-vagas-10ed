import { UserDetailDTO } from '../../../../shared/domain/dtos';
import { UserSharedRepository } from '../../../../shared/infra/repositories';

export class ListUsersUseCase {
    async execute(): Promise<UserDetailDTO[]> {
        const sharedRepository = new UserSharedRepository();
        const list = await sharedRepository.getUserAll();
        return list;
    }
}
