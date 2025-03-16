import express from 'express';
import {
    getPendingAppointmentsController,
    getAppointmentByIdController,
    getAppointmentsByJobController,
    createAppointmentController,
    confirmAppointmentController
} from '../controllers/appointment.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const appointmentRouter = express.Router();

appointmentRouter.get('/appoint/:id', authenticateJWT, getAppointmentByIdController);
appointmentRouter.get('/pending/:doctor', authenticateJWT, getPendingAppointmentsController)
appointmentRouter.get('/:job', authenticateJWT, getAppointmentsByJobController);
appointmentRouter.post('/', authenticateJWT, createAppointmentController);
appointmentRouter.put('/:id', authenticateJWT, confirmAppointmentController)

export default appointmentRouter;