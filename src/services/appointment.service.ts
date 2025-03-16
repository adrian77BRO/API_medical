import { db } from '../config/database';
import { Appointment, AppointReq, AppointRes } from '../models/appointment';

export const getPendingAppointmentsService = async (id_doctor: number): Promise<AppointRes[]> => {
    const query = `SELECT a.id_appoint, a.date_appoint, a.observations, a.status,
        j.title, j.cost, a.id_user FROM appointments a JOIN jobs j ON j.id_job = a.id_job
        WHERE a.status = 0 AND j.id_doctor = ? ORDER BY a.created_at DESC
    `;
    const [rows] = await db.query(query, id_doctor);
    return rows as AppointRes[];
};

export const getAppointmentByIdService = async (id: number): Promise<AppointRes | null> => {
    const query = `SELECT * FROM appointments a JOIN jobs j
        ON j.id_job = a.id_job WHERE id_appoint = ?
    `;
    const [rows] = await db.query(query, id);
    const appointments = rows as AppointRes[];
    return appointments.length ? appointments[0] : null;
};

export const getAppointmentsByJobService = async (id_job: number, id_user: number): Promise<Appointment[]> => {
    const query = `
        SELECT * FROM appointments WHERE id_job = ? AND id_user = ? ORDER BY created_at DESC
    `;
    const [rows] = await db.query(query, [id_job, id_user]);
    return rows as Appointment[];
};

export const confirmAppointmentService = async (id: number): Promise<void> => {
    const query = 'UPDATE appointments SET status = 1 WHERE id_appoint = ?';
    await db.query(query, id);
};

export const createAppointmentService = async (
    date_appoint: string,
    observations: string,
    id_job: number,
    id_user: number
): Promise<AppointReq> => {
    const query = `
        INSERT INTO appointments (date_appoint, observations, status,
        id_job, id_user, created_at) VALUES (?, ?, 0, ?, ?, now())
    `;
    const [result] = await db.query(query, [date_appoint, observations, id_job, id_user]);

    const appointment: AppointReq = {
        id_appoint: (result as any).insertId,
        date_appoint,
        observations,
        id_job,
        id_user
    };
    return appointment;
};