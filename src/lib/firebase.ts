import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQA6R11KtMiSYf5JUWhVkLZ_pem5gkU_Y",
  authDomain: "technorage-75293.firebaseapp.com",
  projectId: "technorage-75293",
  storageBucket: "technorage-75293.firebasestorage.app",
  messagingSenderId: "170808141668",
  appId: "1:170808141668:web:040b6f4db182678e677c71",
  measurementId: "G-XJETZ3VJDE"
};

// Initialize Firebase app only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Export authentication methods
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};

export type { FirebaseUser };