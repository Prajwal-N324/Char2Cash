import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBx20mbsxW1Mx90dE1Czq485TG7Bcim1j4",
  authDomain: "char2cash-958e8.firebaseapp.com",
  projectId: "char2cash-958e8",
  storageBucket: "char2cash-958e8.firebasestorage.app",
  messagingSenderId: "906511763597",
  appId: "1:906511763597:web:02a0621517330f828d7ac4",
  measurementId: "G-X4MQX1P695"
};

const app = initializeApp(firebaseConfig);

// Create and Export them immediately
export const db = getFirestore(app);
export const auth = getAuth(app);

// Emulator setup
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  try {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  } catch (e) {
    console.log("Emulators already connected");
  }
}