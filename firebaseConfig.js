import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVtkvwKU5cFHB1si1GsNnOsR2oD2wS0A4",
  authDomain: "studio-6409730190-4222c.firebaseapp.com",
  projectId: "studio-6409730190-4222c",
  storageBucket: "studio-6409730190-4222c.firebasestorage.app",
  messagingSenderId: "804470762980",
  appId: "1:804470762980:web:9a2ca668305b907d406bf1"
};

const app = initializeApp(firebaseConfig);
// Conecta especificamente ao seu banco de dados dissonantbeats
export const db = getFirestore(app, "dissonantbeats");
