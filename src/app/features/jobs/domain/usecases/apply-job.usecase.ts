import { CustomError } from '../../../../shared/errors';
import { JobRepository } from '../../infra/repositories/job.repository';

export class ApplyJobUseCase {
    async execute(idJob: string, idCandidate: string) {
        const jobRepository = new JobRepository();

        const job = await jobRepository.getJob(idJob);

        if (!job) {
            throw new CustomError('Job is not found.');
        }

        if (job.limitDate.getTime() < new Date().getTime()) {
            throw new CustomError('Max limit date in job.');
        }

        if (!job.open) throw new CustomError('Job is close.');
    }
}
