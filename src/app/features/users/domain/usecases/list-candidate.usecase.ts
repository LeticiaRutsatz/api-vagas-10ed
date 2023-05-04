import { UserDetailDTO } from '../../../../shared/domain/dtos';
import { UserSharedRepository } from '../../../../shared/infra/repositories';
import { UserRepository } from '../../infra/repositories';

export class ListCandidateUseCase {
    async execute(): Promise<UserDetailDTO[]> {
        const repository = new UserRepository();
        const sharedRepository = new UserSharedRepository();
        const list = await sharedRepository.getCandidates();

        return list;
    }
}
