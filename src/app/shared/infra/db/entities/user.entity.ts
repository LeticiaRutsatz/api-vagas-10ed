import { Column, Entity } from 'typeorm';
import BaseEntity from './base-entity.entity';
import { Profile } from '../../../domain/enums';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({ type: 'enum', enum: Profile })
    profile!: Profile;

    @Column()
    password!: string;

    @Column()
    company!: string;
}
