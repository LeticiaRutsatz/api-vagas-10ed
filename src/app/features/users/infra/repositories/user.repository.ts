import { UserDetailDTO } from '../../../../shared/domain/dtos';
import { appDataSource } from '../../../../shared/infra/db/data-source';
import { UserEntity } from '../../../../shared/infra/db/entities';
import { CreateUserDTO } from '../../domain/dtos';

export class UserRepository {
    private _repository = appDataSource.getRepository(UserEntity);

    async saveUser(user: CreateUserDTO): Promise<UserDetailDTO> {
        const entity = this._repository.create({
            email: user.email,
            name: user.name,
            profile: user.profile,
            password: user.password,
            company: user.company,
        });
        await this._repository.save(entity);

        return this.mapperToUserDetail(entity);
    }

    private mapperToUserDetail(entity: UserEntity) {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            profile: entity.profile,
            company: entity.company,
        };
    }
}
