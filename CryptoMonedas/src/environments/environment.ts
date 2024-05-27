// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// src/environments/environment.ts

export const firebaseConfig = {
    apiKey: "AIzaSyBYFlvRojJ-zC9n_CeAsKUOWy9ldLDLFIA",
    authDomain: "cryptotracker-b1ef7.firebaseapp.com",
    projectId: "cryptotracker-b1ef7",
    storageBucket: "cryptotracker-b1ef7.appspot.com",
    messagingSenderId: "346502440556",
    appId: "1:346502440556:web:ac54a82173c727c8325a49"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);