import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
    validateEmail,
    validatePassword
} from '../helpers/validateUser';
import {
    registerService,
    findUserByEmailService
} from '../services/user.service';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const registerController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { fname, lname, email, password, device_token } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Formato de correo inválido',
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                status: 'error',
                message: 'La contraseña debe tener más de 8 caracteres',
            });
        }

        const existingUser = await findUserByEmailService(email);
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'El correo ya está en uso',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await registerService(fname, lname, email, hashedPassword, device_token);

        return res.status(201).json({
            status: 'success',
            message: 'Registro exitoso, ahora puedes iniciar sesión',
            user: {
                id: user.id_user,
                username: user.fname + ' ' + user.lname,
                email: user.email,
                device_token: user.device_token
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Error registering user',
            error,
        });
    }
};

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmailService(email);

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Correo incorrecto',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Contraseña incorrecta',
            });
        }

        const token = jwt.sign({ id: user.id_user }, JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.status(200).json({
            status: 'success',
            message: 'Acceso exitoso al sistema',
            user,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Error logging in user',
            error,
        });
    }
};