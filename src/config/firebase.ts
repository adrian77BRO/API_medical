import admin from 'firebase-admin';
//import * as serviceAccount from '../../tasknotify-fb213-firebase-adminsdk-fbsvc-8c338f3cd6.json';
const serviceAccount = require('../../tasknotify-fb213-firebase-adminsdk-fbsvc-8c338f3cd6.json');
import { Appointment } from '../models/appointment';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const sendNotifToOneDevice = async (data: Appointment, token: string) => {
    try {
        const message = {
            token: token,
            notification: {
                title: 'Cita confirmada',
                body: `Cita reservada para la fecha: ${data.date_appoint}. Observaciones: ${data.observations}`
            },
        };
        const response = await admin.messaging().send(message);
        return response;

    } catch (error) {
        console.error("Error sending notification:", error);
    }
}