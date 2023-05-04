import { UserDetailDTO } from '../../domain/dtos';
import { appDataSource } from '../db/data-source';
import { UserEntity } from '../db/entities';

type GetUserByEmailOptions = {
    withPassword: boolean;
};

export class UserSharedRepository {
    private _repository = appDataSource.getRepository(UserEntity);

    async getUserByEmail(
        email: string,
        options?: GetUserByEmailOptions,
    ): Promise<UserDetailDTO | undefined> {
        const user = await this._repository.findOneBy({ email });
        if (!user) return undefined;

        return this.mapperToUserDetail(user, options);
    }

    async getUserAll(): Promise<UserDetailDTO[]> {
        const users = await this._repository.find();

        return users.map((user) => this.mapperToUserDetail(user));
    }

    private mapperToUserDetail(entity: UserEntity, options?: GetUserByEmailOptions) {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            profile: entity.profile,
            company: entity.company,
            password: options != null && options.withPassword ? entity.password : undefined,
        };
    }
}
