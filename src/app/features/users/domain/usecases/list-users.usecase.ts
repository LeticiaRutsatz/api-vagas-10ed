import { UserDetailDTO } from '../../../../shared/domain/dtos';
import { CacheRepository, UserSharedRepository } from '../../../../shared/infra/repositories';

interface Result {
    data: UserDetailDTO[];
    cache: boolean;
}
export class ListUsersUseCase {
    async execute(): Promise<Result> {
        const cacheRepository = new CacheRepository();

        const cache = await cacheRepository.get('users');

        if (cache) return { cache: true, data: cache };

        const sharedRepository = new UserSharedRepository();
        const list = await sharedRepository.getUserAll();

        await cacheRepository.saveEx('users', list, 120);

        return { cache: false, data: list };
    }
}
