import { Profile } from '../enums';

export interface UserDetailDTO {
    id: string;
    name: string;
    email: string;
    profile: Profile;
    company?: string;
    password?: string;
}
