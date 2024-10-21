import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxDpjaiHQl58SKkosW7qSa2smacV5JGGc",
  authDomain: "food-guide-app.firebaseapp.com",
  projectId: "food-guide-app",
  storageBucket: "food-guide-app.appspot.com",
  messagingSenderId: "952857277709",
  appId: "1:952857277709:web:0c61c80bd1f5b375d86c44"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);

// Export instances for use in other files
export { db, auth };