import { db } from '../config/database';
import { Doctor } from '../models/doctor';

export const findDoctorByEmailService = async (email: string): Promise<Doctor | null> => {
    const [rows] = await db.query('SELECT * FROM doctors WHERE email = ?', email);
    const users = rows as Doctor[];
    return users.length ? users[0] : null;
};

export const registerDoctorService = async (
    fname: string,
    lname: string,
    email: string,
    password: string
): Promise<Doctor> => {

    const [result] = await db.query(
        'INSERT INTO doctors (fname, lname, email, password) VALUES (?, ?, ?, ?)',
        [fname, lname, email, password]
    );

    const doctor: Doctor = {
        id_doctor: (result as any).insertId,
        fname,
        lname,
        email,
        password
    };
    return doctor;
};