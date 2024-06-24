import { db } from '../../../../firebaseConfig';
import { collection, addDoc, getDoc, deleteDoc, doc } from 'firebase/firestore';

export class DetailsEventModel {

    static async getEventById(eventId) {
        try {
            const docRef = doc(db, 'events', eventId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const event = { id: docSnap.id, ...docSnap.data() };
                return event;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting event:', error);
            throw error; // mostrar error
        }
    }

}