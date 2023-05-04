import { appDataSource } from '../../../../shared/infra/db/data-source';
import { JobEntity } from '../../../../shared/infra/db/entities';
import { CreateFullJobDTO } from '../../domain/dtos';

export class JobRepository {
    private _repository = appDataSource.getTreeRepository(JobEntity);
    async createJob(data: CreateFullJobDTO) {
        const job = this._repository.create({
            description: data.description,
            isOpen: data.open,
            maxCandidate: data.maxCandidate,
            idRecruiter: data.idRecruiter,
            companyName: data.companyName,
            limitDate: data.limitDate,
        });
        await this._repository.save(job);

        return this.mapperToJobDetail(job);
    }

    private mapperToJobDetail(job: JobEntity): CreateFullJobDTO {
        return {
            description: job.description,
            limitDate: job.limitDate,
            maxCandidate: job.maxCandidate,
            companyName: job.companyName,
            idRecruiter: job.idRecruiter,
            open: job.isOpen,
        };
    }
}
