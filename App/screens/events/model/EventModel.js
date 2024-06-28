import { db } from '../../../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, Timestamp } from 'firebase/firestore';

export class EventModel {


    //Obtener los eventos
    static async getEvents() {
        try {
            const eventsSnapshot = await getDocs(collection(db, 'events'));
            return eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting events:', error);
            return [];
        }
    }

    // Obtener los eventos antes de las 10 PM
    static async getEventsTen() {
        try {
            const eventsRef = collection(db, 'events');

            // Obtener la fecha actual y establecer las 10 PM en UTC-6
            const currentDate = new Date();
            currentDate.setUTCHours(4, 0, 0, 0); // Establecer las 10 PM en UTC

            // Crear la consulta para obtener eventos antes de las 10pm UTC-6
            const q = query(eventsRef, where('date', '<', currentDate));

            // Ejecutar la consulta
            const querySnapshot = await getDocs(q);


            //Guardarlos en un arreglo
            const events = [];
            querySnapshot.forEach((doc) => {
                events.push({ id: doc.id, ...doc.data() });
            });
            return events;

        } catch (error) {
            console.error('Error getting documents: ', error);
        }
    }

    //Eliminar los eventos
    static async deleteEvent(eventId) {
        try {
            await deleteDoc(doc(db, 'events', eventId));
            return true;
        } catch (error) {
            console.error('Error deleting event:', error);
            return false;
        }
    }


}