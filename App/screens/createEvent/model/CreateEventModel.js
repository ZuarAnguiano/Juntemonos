import { db } from "../../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export class CreateEventModel {
    constructor(name, description, date, coordinates, interests) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.coordinates = coordinates;
        this.interests = interests;
    }

//Funcion para guardar el evento en la base de datos
    static async saveEvent(event) {
        try {
            console.log(db);
            const refDoc = await addDoc(collection(db, "events"), {
                name: event.name,
                description: event.description,
                date: event.date,
                coordinates: event.coordinates,
                interests: event.interests,
            });
            return true;
        } catch (error) {
            console.error('Error saving event:', error);
            return false;
        }
    }

}