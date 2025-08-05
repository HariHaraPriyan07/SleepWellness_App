// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArnb0l7OdW2wgR1WV6aDd8NqeB7gSOCmM",
  authDomain: "sleepwellnessapp-c0441.firebaseapp.com",
  projectId: "sleepwellnessapp-c0441",
  storageBucket: "sleepwellnessapp-c0441.firebasestorage.app",
  messagingSenderId: "970457131647",
  appId: "1:970457131647:web:587c1ed473dac433522d4a",
  measurementId: "G-TNTLX8H27X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);