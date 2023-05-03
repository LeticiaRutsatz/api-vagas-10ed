import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './base-entity.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'jobs' })
export class JobEntity extends BaseEntity {
    @Column()
    description!: string;

    @Column({ name: 'id_recruiter' })
    idRecruiter!: string;

    @Column({ name: 'company_name' })
    companyName!: string;

    @Column({ name: 'is_open' })
    isOpen!: boolean;

    @Column({ name: 'limit_date' })
    limitDate!: Date;

    @Column({ name: 'max_candidates' })
    maxCandidates!: number;

    @ManyToOne(() => UserEntity, (entity) => entity.jobs)
    @JoinColumn({ name: 'id_recruiter', referencedColumnName: 'id' })
    recruiter!: UserEntity;
}
