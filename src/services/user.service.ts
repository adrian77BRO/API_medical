import { db } from '../config/database';
import { User } from '../models/user';

export const findUserByEmailService = async (email: string): Promise<User | null> => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows as User[];
    return users.length ? users[0] : null;
};

export const getDeviceTokenByUser = async (id_user: number): Promise<string> => {
    console.log(id_user);
    const [rows] = await db.query('SELECT device_token FROM users WHERE id_user = ?', [id_user]);
    const token = rows as User[];
    return token[0].device_token;
};

export const registerService = async (
    fname: string,
    lname: string,
    email: string,
    password: string,
    device_token: string
): Promise<User> => {

    const [result] = await db.query(
        'INSERT INTO users (fname, lname, email, password, device_token) VALUES (?, ?, ?, ?, ?)',
        [fname, lname, email, password, device_token]
    );

    const user: User = {
        id_user: (result as any).insertId,
        fname,
        lname,
        email,
        password,
        device_token
    };
    return user;
};