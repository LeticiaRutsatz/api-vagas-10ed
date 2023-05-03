export interface CreateJobDTO{
    description: string;
    limitDate: Date;
    maxCandidate?: number;
}

export interface CreateFullJobDTO extends CreateJobDTO {
   recruiterId: string;
   open: boolean;
   company: string;
}