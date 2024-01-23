import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA0EwZpKXhEo00JYPq7_5H1Q9uiMtUomsk",
    authDomain: "desksense-project.firebaseapp.com",
    projectId: "desksense-project", 
    storageBucket: "desksense-project.appspot.com", 
    messagingSenderId: "834745453959",  
    appId: "1:834745453959:web:5881d74930449b2fcc1722",
    measurementId: "G-0P0EMSQLJM"  
};
  
if(firebase.apps.length===0){firebase.initializeApp(firebaseConfig)}

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export { firebase };

