import { AuthUserDTO } from "../../../../shared/domain/dtos";
import { Profile } from "../../../../shared/domain/enums";
import { CustomError } from "../../../../shared/errors";
import { CreateJobDTO } from "../dtos";
import { JobRepository } from "../../infra/repositories/job.repository";

export class CreateJobUseCase {
    async execute(createJob: CreateJobDTO, authUser: AuthUserDTO): Promise<any> {
        if (authUser.profile !== Profile.RECRUITER) {
            throw new CustomError('User is not RECRUITER');
        }
        const repository = new JobRepository();
        await repository.createJob({ ...createJob, recruiterId: authUser.id, open: true, company: authUser.company! });
    }
    
}