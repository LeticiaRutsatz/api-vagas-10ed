import { JobDetailDTO } from '../../../../shared/domain/dtos';
import { appDataSource } from '../../../../shared/infra/db/data-source';
import { JobEntity } from '../../../../shared/infra/db/entities';
import { CreateFullJobDTO } from '../../domain/dtos';

export class JobRepository {
    private _repository = appDataSource.getTreeRepository(JobEntity);

    async createJob(data: CreateFullJobDTO): Promise<JobDetailDTO> {
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

    async getJob(id: string): Promise<JobDetailDTO | undefined> {
        const job = await this._repository.findOne({ where: { id } });

        if (!job) return undefined;

        return this.mapperToJobDetail(job);
    }

    private mapperToJobDetail(job: JobEntity): JobDetailDTO {
        return {
            id: job.id,
            description: job.description,
            limitDate: job.limitDate,
            maxCandidate: job.maxCandidate,
            companyName: job.companyName,
            open: job.isOpen,
        };
    }
}
