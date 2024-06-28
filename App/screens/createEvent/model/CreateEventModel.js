import { db } from "../../../../firebaseConfig";
import { addDoc, collection, query, where, getDocs, Timestamp } from "firebase/firestore";

export class CreateEventModel {
    constructor(name, description, date, coordinates, interests, userId) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.coordinates = coordinates;
        this.interests = interests;
        this.userId = userId;
    }


    // Función para guardar el evento en la base de datos
    static async saveEvent(event) {
        try {
            const refDoc = await addDoc(collection(db, "events"), {
                name: event.name,
                description: event.description,
                date: event.date,
                coordinates: event.coordinates,
                interests: event.interests,
                createBy: event.userId
            });
            return true;
        } catch (error) {
            console.error('Error saving event:', error);
            return false;
        }
    }

    // Función para verificar el límite de eventos
    static async checkEventLimit(userId) {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, where('createBy', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size; // Devuelve el número de eventos creados por el usuario
    }

    // Función para verificar el tipo de usuario
    static async checkUserType(userId) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return userDoc.data().typeUser; // Devuelve el tipo de usuario
        }
        throw new Error('Usuario no encontrado');
    }
}
