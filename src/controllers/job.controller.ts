import { Request, Response } from 'express';
import {
    getAllJobsService,
    getJobByIdService,
    getJobsByDoctorService,
    createJobService
} from '../services/job.service';

export const getAllJobsController = async (req: Request, res: Response) => {
    try {
        const jobs = await getAllJobsService();

        return res.status(200).json({
            status: 'success',
            message: 'Todos los servicios médicos',
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error getting jobs',
            error
        });
    }
};

export const getJobByIdController = async (req: Request, res: Response) => {
    try {
        const job = await getJobByIdService(parseInt(req.params.id));

        if (job) {
            return res.status(200).json({
                status: 'success',
                message: 'Servicio médico encontrado',
                job
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error searching job',
            error
        });
    }
};

export const getJobsByDoctorController = async (req: Request, res: Response) => {
    try {
        const jobs = await getJobsByDoctorService(parseInt(req.params.doctor));

        return res.status(200).json({
            status: 'success',
            message: 'Servicios médicos',
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error searching jobs',
            error
        });
    }
};

export const createJobController = async (req: Request, res: Response) => {
    try {
        const { title, description, cost } = req.body;
        const newJob = await createJobService(title, description, cost, parseInt(req.params.doctor));

        return res.status(201).json({
            status: 'success',
            message: 'Servicio médico creado',
            job: newJob
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error creating job',
            error
        });
    }
};