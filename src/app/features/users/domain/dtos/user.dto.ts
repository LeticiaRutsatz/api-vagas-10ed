import { Profile } from '../../../../shared/domain/enums';

export interface UserDTO {
    name: string;
    email: string;
    profile: Profile;
    password?: string;
}
