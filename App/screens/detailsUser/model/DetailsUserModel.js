import { db } from '../../../../firebaseConfig';
import { collection, addDoc, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export class DetailsUserModel {

    //Obtener el usuario con el id 
    static async getUserById(userId) {
        try {
            console.log(userId)
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const event = { id: docSnap.id, ...docSnap.data() };
                return event;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting user:', error);
            throw error; // mostrar error
        }
    }

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