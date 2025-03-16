import express from 'express';
import {
    getAllJobsController,
    getJobByIdController,
    getJobsByDoctorController,
    createJobController
} from '../controllers/job.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const jobRouter = express.Router();

jobRouter.get('/', authenticateJWT, getAllJobsController);
jobRouter.get('/job/:id', authenticateJWT, getJobByIdController);
jobRouter.get('/:doctor', authenticateJWT, getJobsByDoctorController);
jobRouter.post('/', authenticateJWT, createJobController);

export default jobRouter;