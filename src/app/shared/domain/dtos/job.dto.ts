export interface JobDetailDTO {
    id: string;
    description: string;
    limitDate: Date;
    maxCandidate?: number;
    open: boolean;
    companyName: string;
}
