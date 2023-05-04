export interface CreateJobDTO {
    description: string;
    limitDate: Date;
    maxCandidate?: number;
}

export interface CreateFullJobDTO extends CreateJobDTO {
    idRecruiter: string;
    open: boolean;
    companyName: string;
}
