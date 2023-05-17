import { CreateJobDTO } from '../../../../../../src/app/features/jobs/domain/dtos';
import { CreateJobUseCase } from '../../../../../../src/app/features/jobs/domain/usecases/create-job.usecase';
import { JobRepository } from '../../../../../../src/app/features/jobs/infra/repositories/job.repository';
import { AuthUserDTO, JobDetailDTO } from '../../../../../../src/app/shared/domain/dtos';
import { Profile } from '../../../../../../src/app/shared/domain/enums';
import { CustomError } from '../../../../../../src/app/shared/errors';

const createJobDetailDTO = (maxCandidates?: number): JobDetailDTO => ({
    id: 'any_id',
    description: 'any_description',
    companyName: 'any_company',
    open: true,
    limitDate: new Date(),
    maxCandidate: maxCandidates,
});

const createAuthUserDTO = (profile = Profile.RECRUITER): AuthUserDTO => ({
    id: 'any_id_recruiter',
    profile,
});

const createJobDTO = (maxCandidate?: number): CreateJobDTO => ({
    description: 'any_description',
    limitDate: new Date(),
    maxCandidate,
});

describe('[Use Case] - Create Job', () => {
    it('Should return erro with message User is not RECRUITER', async () => {
        const sut = new CreateJobUseCase();
        const promise = sut.execute(createJobDTO(), createAuthUserDTO(Profile.ADMIN));

        await expect(promise).rejects.toThrow(new CustomError('User is not RECRUITER'));
    });

    it('Should return a job data with success without maxCandidates', async () => {
        const jobDetailDTO = createJobDetailDTO();

        jest.spyOn(JobRepository.prototype, 'createJob').mockResolvedValueOnce(jobDetailDTO);
        const sut = new CreateJobUseCase();

        const job = await sut.execute(createJobDTO(), createAuthUserDTO());

        expect(job).toEqual(jobDetailDTO);
    });

    it('Should return a job data with maxCandidates with success ', async () => {
        const jobDetailDTO = createJobDetailDTO(10);

        jest.spyOn(JobRepository.prototype, 'createJob').mockResolvedValueOnce(jobDetailDTO);

        const sut = new CreateJobUseCase();

        const job = await sut.execute(createJobDTO(10), createAuthUserDTO());

        expect(job).toEqual(jobDetailDTO);
    });
});
