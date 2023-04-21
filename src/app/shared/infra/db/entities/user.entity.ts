import { Column } from 'typeorm';
import { BaseEntity } from '.';
import { Profile } from '../../../domain/enums';

export class UserEntity extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({ type: 'enum', enum: Profile })
    profile!: Profile;
}
