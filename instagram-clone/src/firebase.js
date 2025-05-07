import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4gZqO1ZmIfNQpeiI-Rm5z7b5rU_lHgPI",
    authDomain: "instagram-clone-zaio.firebaseapp.com",
    projectId: "instagram-clone-zaio",
    storageBucket: "instagram-clone-zaio.firebasestorage.app",
    messagingSenderId: "621090973907",
    appId: "1:621090973907:web:e42da5e035143d0e154c26",
    measurementId: "G-BYF2DC34JL"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);