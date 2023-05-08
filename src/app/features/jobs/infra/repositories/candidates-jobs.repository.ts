import { CandidateJobStatus } from '../../../../shared/domain/enums';
import { appDataSource } from '../../../../shared/infra/db/data-source';
import { CandidateJobEntity } from '../../../../shared/infra/db/entities';

interface ResponseCandidateJobRepository {
    count: number;
    candidateAlreadyExists: boolean;
}

export class CandidateJobRepository {
    private _reposity = appDataSource.getTreeRepository(CandidateJobEntity);

    async getTotalAndCandidatesExists(
        idJob: string,
        idCandidate: string,
    ): Promise<ResponseCandidateJobRepository> {
        const count = await this._reposity.count({ where: { jobId: idJob } });

        const candidateAlreadyExists = await this._reposity.findOne({
            where: { candidateId: idCandidate },
        });

        return {
            count,
            candidateAlreadyExists: !!candidateAlreadyExists,
        };
    }

    async saveCandidates(idJob: string, idCandidate: string): Promise<CandidateJobEntity> {
        const job = this._reposity.create({
            jobId: idJob,
            candidateId: idCandidate,
            status: CandidateJobStatus.IN_PROCESS,
        });

        await this._reposity.save(job);

        return job;
    }
}
