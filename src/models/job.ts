export type Job = {
    id_job: number;
    title: string;
    description: string;
    cost: number;
    id_doctor: number;
}

export type JobRes = {
    id_job: number;
    title: string;
    description: string;
    cost: number;
    doctor: string;
}