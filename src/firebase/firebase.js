import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCf1zS6J8WvcJFUpJxR5-wV1VifqUE5zQ8",
  authDomain: "fir-loginautentication.firebaseapp.com",
  projectId: "fir-loginautentication",
  storageBucket: "fir-loginautentication.appspot.com",
  messagingSenderId: "1079620239780",
  appId: "1:1079620239780:web:f2e267c271d451816e0131",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const firestore = getFirestore(app);

// Inicializa Authentication
const auth = getAuth(app);

// Inicializa Storage
const storage = getStorage(app);

// Función para agregar un nuevo comentario
const addComment = async (text) => {
  try {
    const docRef = await addDoc(collection(firestore, "comments"), { text });
    console.log("Comentario añadido con ID:", docRef.id);
  } catch (e) {
    console.error("Error añadiendo comentario:", e);
  }
};

// Función para actualizar o crear un comentario
const updateOrAddComment = async (id, text) => {
  try {
    const docRef = doc(firestore, "comments", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setDoc(docRef, { text }, { merge: true });
      console.log("Comentario actualizado con ID:", id);
    } else {
      await setDoc(docRef, { text });
      console.log("Comentario creado con ID:", id);
    }
  } catch (e) {
    console.error("Error actualizando o creando comentario:", e);
  }
};

// Función para obtener todos los comentarios
const fetchComments = async () => {
  try {
    const commentsCollection = collection(firestore, "comments");
    const commentsSnapshot = await getDocs(commentsCollection);
    const commentsList = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Comentarios:", commentsList);
    return commentsList;
  } catch (e) {
    console.error("Error leyendo comentarios:", e);
  }
};

export {
  firestore,
  addComment,
  updateOrAddComment,
  fetchComments,
  auth,
  storage,
};
