import { appDataSource } from '../../../../shared/infra/db/data-source';
import { UserEntity } from '../../../../shared/infra/db/entities';
import { UserDTO } from '../../domain/dtos/user.dto';

export class UserRepository {
    private _repository = appDataSource.getRepository(UserEntity);

    async getUserByEmail(email: string): Promise<UserDTO | null> {
        const user = this._repository.findOneBy({ email });
        return user;
    }

    async saveUser(user: UserDTO): Promise<void> {
        await this._repository.save(user);
    }
}
