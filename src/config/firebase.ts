import admin from 'firebase-admin';
import serviceAccount from '../../tasknotify-fb213-firebase-adminsdk-fbsvc-8c338f3cd6.json';
import { AppointRes } from '../models/appointment';
import { Job } from '../models/job';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
});

export const sendConfirmNotif = async (data: AppointRes, token: string) => {
    try {
        const date_appoint = new Date(data.date_appoint);
        const message = {
            token: token,
            notification: {
                title: 'Cita confirmada',
                body: `📅 Fecha: ${date_appoint.toLocaleDateString("es-ES")}\n` +
                    `🛠 Servicio: ${data.title}\n` +
                    `📝 Observaciones: ${data.observations}\n` +
                    `💰 Costo: $${data.cost}`
            },
        };
        const response = await admin.messaging().send(message);
        return response;

    } catch (error) {
        console.error("Error sending notification:", error);
    }
}

export const sendGlobalNotif = async (data: Job, tokens: string[]) => {
    try {
        if (tokens.length === 0) {
            console.log("No hay tokens disponibles para enviar la notificación.");
            return;
        }
        const message = {
            tokens: tokens,
            notification: {
                title: 'Nuevo servicio médico',
                body: `Nuevo servicio médico ${data.title} para los pacientes\n` +
                    `Reserve su consulta en caso de algún padecimiento`
            },
        };
        const response = await admin.messaging().sendEachForMulticast(message);
        return response;

    } catch (error) {
        console.error("Error enviando la notificación:", error);
    }
};