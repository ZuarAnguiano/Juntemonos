// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
//Credenciales de prueba

  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWDCcGr0ORt4QiVjpwnoWghBuqyru9A1A",
  authDomain: "juntemonos-df03f.firebaseapp.com",
  databaseURL: "https://juntemonos-df03f-default-rtdb.firebaseio.com",
  projectId: "juntemonos-df03f",
  storageBucket: "juntemonos-df03f.appspot.com",
  messagingSenderId: "884600211688",
  appId: "1:884600211688:web:5d011d28fc4baeee6ba15d",
  measurementId: "G-4BY4FY2XPX"
};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase); 

export { firebase, db, auth };
//const analytics = getAnalytics(app);


