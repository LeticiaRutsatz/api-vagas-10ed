import { appDataSource } from '../../../../shared/infra/db/data-source';
import { UserEntity } from '../../../../shared/infra/db/entities';
import { CreateUserDTO, UserDetailDTO } from '../../domain/dtos/user.dto';

export class UserRepository {
    private _repository = appDataSource.getRepository(UserEntity);

    async getUserByEmail(email: string): Promise<UserDetailDTO | undefined> {
        const user = await this._repository.findOneBy({ email });
        if (!user) return undefined;

        return this.mapperToUserDetail(user);
    }

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
