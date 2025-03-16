import express from 'express';
import {
    registerDoctorController,
    loginDoctorController
} from '../controllers/doctor.controller';

const doctorRouter = express.Router();

doctorRouter.post('/register', registerDoctorController);
doctorRouter.post('/login', loginDoctorController);

export default doctorRouter;