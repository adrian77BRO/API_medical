import admin from 'firebase-admin';
import serviceAccount from '../../tasknotify-fb213-firebase-adminsdk-fbsvc-8c338f3cd6.json';
import { AppointRes } from '../models/appointment';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
});

export const sendNotifToOneDevice = async (data: AppointRes, token: string) => {
    try {
        const date_appoint = new Date(data.date_appoint);
        const message = {
            token: token,
            notification: {
                title: 'Cita confirmada',
                body: `📅 Fecha: ${date_appoint.toLocaleDateString("es-ES")}\n` +
                    `🛠 Servicio: ${data.title}\n` +
                    `📝 Observaciones: ${data.observations}\n` +
                    `💰 Costo: ${data.cost}`
            },
        };
        const response = await admin.messaging().send(message);
        return response;

    } catch (error) {
        console.error("Error sending notification:", error);
    }
}