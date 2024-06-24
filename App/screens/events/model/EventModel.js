import { db } from '../../../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export class EventModel {


    static async getEvents() {
        try {
            const eventsSnapshot = await getDocs(collection(db, 'events'));
            return eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting events:', error);
            return [];
        }
    }

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