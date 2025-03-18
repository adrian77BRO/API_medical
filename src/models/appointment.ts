export type AppointReq = {
    id_appoint: number;
    date_appoint: string;
    observations: string;
    id_job: number;
    id_user: number;
}

export type Appointment = {
    id_appoint: number;
    date_appoint: string;
    observations: string;
    status: number; // 0 pendiente, 1 confirmado
    id_job: number;
    id_user: number;
}

export type AppointRes = {
    id_appoint: number;
    date_appoint: string;
    observations: string;
    status: number;
    title: string; // nombre del servicio
    cost: number;
    id_user: number;
}