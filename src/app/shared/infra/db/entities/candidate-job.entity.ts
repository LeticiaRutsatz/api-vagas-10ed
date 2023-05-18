import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './base-entity.entity';
import { UserEntity } from './user.entity';
import { CandidateJobStatus } from '../../../domain/enums';
import { JobEntity } from './job.entity';

@Entity({ name: 'candidates_jobs' })
export class CandidateJobEntity extends BaseEntity {
    @Column({ name: 'id_job' })
    jobId!: string;

    @Column({ name: 'id_candidate' })
    candidateId!: string;

    @Column({ type: 'enum', enum: CandidateJobStatus })
    status!: CandidateJobStatus;

    @ManyToOne(() => JobEntity, (entity) => entity.candidatesJob)
    @JoinColumn({ referencedColumnName: 'id', name: 'id_job' })
    job!: JobEntity;

    @ManyToOne(() => UserEntity, (entity) => entity.candidatesJob)
    @JoinColumn({ referencedColumnName: 'id', name: 'id_candidate' })
    candidate!: UserEntity;
}
