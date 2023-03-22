import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: "AIzaSyC5q50nIbcUCD2UdpTMvXGIm0uRWSw_4zM",
  authDomain: "whatsapp-clone-2506e.firebaseapp.com",
  projectId: "whatsapp-clone-2506e",
  storageBucket: "whatsapp-clone-2506e.appspot.com",
  messagingSenderId: "969460747700",
  appId: "1:969460747700:web:5f044b23130cd2301436e1",
  measurementId: "G-8CFFDVYRXH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;