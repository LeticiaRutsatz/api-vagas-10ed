import { CreateJobUseCase } from '../../../../../../src/app/features/jobs/domain/usecases/create-job.usecase';
import { JobRepository } from '../../../../../../src/app/features/jobs/infra/repositories/job.repository';
import { Profile } from '../../../../../../src/app/shared/domain/enums';

describe('[Use Case] - Create Job', () => {
    it('Create Job ', async () => {
        const jobDTO = {
            id: 'any_id',
            description: 'any_description',
            companyName: 'any_company',
            open: true,
            limitDate: new Date(),
        };
        jest.spyOn(JobRepository.prototype, 'createJob').mockResolvedValueOnce(jobDTO);
        const sut = new CreateJobUseCase();

        const job = await sut.execute(
            {
                description: 'any_description',
                limitDate: new Date(),
            },{
                id: 'any_id_recruiter',
                profile: Profile.RECRUITER
            }            
        );

        expect(job).not.toHaveProperty('maxCandidate')
        expect(job).toHaveProperty('id');
    });
});
