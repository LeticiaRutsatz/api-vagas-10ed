import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './base-entity.entity';
import { UserEntity } from './user.entity';
import { CandidateJobEntity } from './candidate-job.entity';

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

    @Column({ name: 'max_candidate' })
    maxCandidate!: number;

    @ManyToOne(() => UserEntity, (entity) => entity.jobs)
    @JoinColumn({ name: 'id_recruiter', referencedColumnName: 'id' })
    recruiter!: UserEntity;

    @OneToMany(() => CandidateJobEntity, (entity) => entity.job)
    candidatesJob!: CandidateJobEntity[];
}
