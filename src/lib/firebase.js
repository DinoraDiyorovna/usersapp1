// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4VzdegeU1OJNlO-tBJb0vyaIzODu1UGQ",
  authDomain: "fir-28cbd.firebaseapp.com",
  projectId: "fir-28cbd",
  storageBucket: "fir-28cbd.appspot.com",
  messagingSenderId: "665313763581",
  appId: "1:665313763581:web:8ac2eb044e04ef37ac9e94",
  measurementId: "G-5L93Q263L4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db as fireStore, app as firebase };
