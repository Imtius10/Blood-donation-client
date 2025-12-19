// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiQfC_PvGNRLcjJulmQq4y2HIFcxUzreQ",
    authDomain: "module11-7b982.firebaseapp.com",
    projectId: "module11-7b982",
    storageBucket: "module11-7b982.firebasestorage.app",
    messagingSenderId: "989656260652",
    appId: "1:989656260652:web:ac3d12368a9cea8a677189"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;