import BaseEntity from './base-entity.entity';
import { UserEntity } from './user.entity';
import { JobEntity } from './job.entity';
import { CandidateJobEntity } from './candidate-job.entity';

export * from './user.entity';
export * from './job.entity';
export * from './base-entity.entity';
export * from './candidate-job.entity';

export default [UserEntity, BaseEntity, JobEntity, CandidateJobEntity];
