import { CustomError } from '../../../../shared/errors';
import { CandidateJobRepository } from '../../infra/repositories/candidates-jobs.repository';
import { JobRepository } from '../../infra/repositories/job.repository';

export class ApplyJobUseCase {
    async execute(idJob: string, idCandidate: string) {
        const jobRepository = new JobRepository();
        const candidateJobRepository = new CandidateJobRepository();

        const job = await jobRepository.getJob(idJob);

        if (!job) {
            throw new CustomError('Job is not found.');
        }

        if (job.limitDate.getTime() < new Date().getTime()) {
            throw new CustomError('Max limit date in job.');
        }

        if (!job.open) throw new CustomError('Job is close.');

        const { count, candidateAlreadyExists } =
            await candidateJobRepository.getTotalAndCandidatesExists(idJob, idCandidate);

        if (candidateAlreadyExists)
            throw new CustomError('Candidate is already registered for the job.');

        if (job.maxCandidate && count >= job.maxCandidate)
            throw new CustomError('Job with maximum limit of candidates.');

        return candidateJobRepository.saveCandidates(idJob, idCandidate);
    }
}
