import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.router';
import doctorRouter from './routes/doctor.router';
import jobRouter from './routes/job.router';
import appointmentRouter from './routes/appointment.router';
import { db } from './config/database';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/doctors', doctorRouter)
app.use('/jobs', jobRouter)
app.use('/appoints', appointmentRouter);

const PORT = process.env.PORT || 4000;

db.getConnection()
    .then(() => {
        console.log('Connected to the database successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err: any) => {
        console.error('Failed to connect to the database:', err);
    });