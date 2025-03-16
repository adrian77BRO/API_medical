import { db } from '../config/database';
import { Job } from '../models/job';

export const getAllJobsService = async (): Promise<Job[]> => {
    const query = 'SELECT * FROM jobs ORDER BY created_at DESC';
    const [rows] = await db.query(query);
    return rows as Job[];
};

export const getJobByIdService = async (id: number): Promise<Job | null> => {
    const query = 'SELECT * FROM jobs WHERE id_job = ?';
    const [rows] = await db.query(query, id);
    const appointments = rows as Job[];
    return appointments.length ? appointments[0] : null;
};

export const getJobsByDoctorService = async (id_doctor: number): Promise<Job[]> => {
    const query = 'SELECT * FROM jobs WHERE id_doctor = ? ORDER BY created_at DESC';
    const [rows] = await db.query(query, id_doctor);
    return rows as Job[];
};

export const createJobService = async (
    title: string,
    description: string,
    cost: number,
    id_doctor: number

): Promise<Job> => {
    const query = `
        INSERT INTO jobs (title, description, cost,
        id_doctor, created_at) VALUES (?, ?, ?, ?, now())
    `;
    const [result] = await db.query(query, [title, description, cost, id_doctor]);

    const job: Job = {
        id_job: (result as any).insertId,
        title,
        description,
        cost,
        id_doctor
    };
    return job;
};