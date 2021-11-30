import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBXBlT_gd-kpCUL2-av4JXLnUlYjkmMLHk",
    authDomain: "sage-2c17a.firebaseapp.com",
    projectId: "sage-2c17a",
    storageBucket: "sage-2c17a.appspot.com",
    messagingSenderId: "126634898925",
    appId: "1:126634898925:web:3ad2fdc664226705bfa3e4",
    measurementId: "G-EKLQGK95ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;