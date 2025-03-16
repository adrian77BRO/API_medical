import { db } from '../config/database';
import { Appointment } from '../models/appointment';

export const getPendingAppointmentsService = async (): Promise<Appointment[]> => {
    const query = 'SELECT * FROM appointments WHERE status = 0 ORDER BY created_at DESC';
    const [rows] = await db.query(query);
    return rows as Appointment[];
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
    const query = 'SELECT * FROM appointments WHERE id_appoint = ?';
    const [rows] = await db.query(query, id);
    const appointments = rows as Appointment[];
    return appointments.length ? appointments[0] : null;
};

export const getAppointmentsByJobService = async (id_job: string, id_user: number): Promise<Appointment[]> => {
    const query = `
        SELECT * FROM appointments WHERE id_job = ? AND created_by = ? ORDER BY created_at DESC
    `;
    const [rows] = await db.query(query, [id_job, id_user]);
    return rows as Appointment[];
};

export const confirmAppointmentService = async (id: number): Promise<void> => {
    const query = 'UPDATE appointments SET status = 1 WHERE id_appoint = ?';
    await db.query(query, [id]);
};

export const createAppointmentService = async (
    date_appoint: string,
    observations: string,
    status: number,
    id_job: number,
    id_user: number
): Promise<Appointment> => {
    const query = `
        INSERT INTO appointments (date_appoint, observations, status,
        id_job, created_at, created_by) VALUES (?, ?, ?, ?, now(), ?)
    `;
    const [result] = await db.query(query, [date_appoint, observations, status, id_job, id_user]);

    const appointment: Appointment = {
        id_appoint: (result as any).insertId,
        date_appoint,
        observations,
        status,
        id_job,
        id_user
    };
    return appointment;
};