import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAruCy8PiCz-ikjphkIL6LScJahMJ6RPxE",
  authDomain: "messenger-clone-101.firebaseapp.com",
  projectId: "messenger-clone-101",
  storageBucket: "messenger-clone-101.appspot.com",
  messagingSenderId: "289663020488",
  appId: "1:289663020488:web:89dfa9b948b18d4bafe4fd",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
