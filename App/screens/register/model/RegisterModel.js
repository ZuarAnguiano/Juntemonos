import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../../../firebaseConfig';


export class RegisterModel {

  constructor(email, password, name, birthdate, typeUser, age) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.birthdate = birthdate;
    this.typeUser = typeUser
    this.age = age;
    this.db = db;
  }

  static async register(dataUser) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, dataUser.email, dataUser.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: dataUser.email,
        name: dataUser.name,
        birthdate: dataUser.birthdate,
        typeUser: dataUser.typeUser,
        age: dataUser.age
      });
      console.log('Usuario registrado:', dataUser);
      return user;
    } catch (error) {
      // Correo ya existe
      if (error.code === 'auth/email-already-in-use') {
        console.error('El correo electrónico ya está registrado.');
        throw new Error('El correo electrónico ya está registrado.');
      } else {
        // Otros errores
        console.error('Error al registrar el usuario:', error.message);
        throw new Error('El correo electrónico ya está registrado.');
      }
    }
  }
}
