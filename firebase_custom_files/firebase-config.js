// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDzYvVJWj6VRrycIAJ0w3YfpvMx8sDWI5E",
  authDomain: "kamal-preet-arts.firebaseapp.com",
  projectId: "kamal-preet-arts",
  storageBucket: "kamal-preet-arts.appspot.com",  // FIXED storageBucket
  messagingSenderId: "717446772076",
  appId: "1:717446772076:web:3cbbf9d514e2c132deaf49",
  measurementId: "G-8RFNVD2QMF"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export for use in other JS files
export { db, auth, storage };
