import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCY1UlN5A48wsfUlp0dwa8KVQTZG0bxFVA",
    authDomain: "mi-primer-firebase-a8ab3.firebaseapp.com",
    projectId: "mi-primer-firebase-a8ab3",
    storageBucket: "mi-primer-firebase-a8ab3.appspot.com",
    messagingSenderId: "318435480225",
    appId: "1:318435480225:web:701a232a71265b4b3596e0"
}

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();