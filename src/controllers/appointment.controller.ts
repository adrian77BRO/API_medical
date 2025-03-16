import { Request, Response } from 'express';
import {
    getPendingAppointmentsService,
    getAppointmentByIdService,
    getAppointmentsByJobService,
    createAppointmentService,
    confirmAppointmentService
} from '../services/appointment.service';
import { sendNotifToOneDevice } from '../config/firebase';
import { getDeviceTokenByUser } from '../services/user.service';

export const getPendingAppointmentsController = async (req: Request, res: Response) => {
    try {
        const appointments = await getPendingAppointmentsService();

        return res.status(200).json({
            status: 'success',
            message: 'Citas pendientes',
            appointments
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error getting appointments',
            error
        });
    }
};

export const getAppointmentByIdController = async (req: Request, res: Response) => {
    try {
        const appointment = await getAppointmentByIdService(parseInt(req.params.id));

        if (appointment) {
            return res.status(200).json({
                status: 'success',
                message: 'Cita encontrada',
                appointment
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Cita no encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error searching appointment',
            error
        });
    }
};

export const getAppointmentsByJobController = async (req: Request, res: Response) => {
    try {
        const id_user = (req as any).user.id;
        const appointments = await getAppointmentsByJobService(req.params.job, id_user);

        return res.status(200).json({
            status: 'success',
            message: 'Historial de citas',
            appointments
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error searching appointments',
            error
        });
    }
};

export const createAppointmentController = async (req: Request, res: Response) => {
    try {
        const id_user = (req as any).user.id;
        const { date_appoint, observations, status, id_job, token } = req.body;

        const newAppointment = await createAppointmentService(
            date_appoint, observations, status, id_job, id_user
        );

        return res.status(201).json({
            status: 'success',
            message: 'Nueva cita reservada',
            appointment: newAppointment
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error reserving appointment',
            error
        });
    }
};

export const confirmAppointmentController = async (req: Request, res: Response) => {
    try {
        const appointment = await getAppointmentByIdService(parseInt(req.params.id));

        if (appointment) {
            await confirmAppointmentService(parseInt(req.params.id));
            const token = await getDeviceTokenByUser(appointment.id_user);

            if (token) {
                const response = await sendNotifToOneDevice(appointment, token);

                return res.status(201).json({
                    status: 'success',
                    message: 'Cita confirmada exitosamente',
                    messageId: response
                });
            }
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Cita no encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error confirming appointment',
            error
        });
    }
};