import { Not } from 'typeorm';
import { UserDetailDTO } from '../../domain/dtos';
import { Profile } from '../../domain/enums';
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
        const users = await this._repository.find({
            where: {
                profile: Not(Profile.CANDIDATE)
            },
        });

        return users.map((user) => this.mapperToUserDetail(user));
    }

    async getCandidates(): Promise<UserDetailDTO[]> {
        const candidates = await this._repository.find({
            where: {
                profile: Profile.CANDIDATE,
            },
        });

        return candidates.map((cand) => this.mapperToUserDetail(cand));
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
