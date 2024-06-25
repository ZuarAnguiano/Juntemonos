import { db } from '../../../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export class HomeModel {


    //Obtiene todos los eventos
    static async getEvents() {
        try {
            const eventsSnapshot = await getDocs(collection(db, 'events'));
            return eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting events:', error);
            return [];
        }
    }

}