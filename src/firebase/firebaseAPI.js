import { db, storage } from "./config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Alert } from "react-native";
import { v4 as uuidv4 } from "uuid";

export const uploadDoc = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    const createdDoc = await addDoc(collectionRef, data);
    return createdDoc;
  } catch (error) {
    Alert.alert(error.message);
    throw error;
  }
};

export const getAllCollections = async (collectionName, setData) => {
  try {
    const collectionRef = collection(db, collectionName);
    onSnapshot(collectionRef, (data) => {
      const docs = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(docs);
      return docs;
    });
  } catch (error) {
    Alert.alert(error.message);
    throw error;
  }
};

export const getCollection = async (collectionName, userId, setData) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("userId", "==", userId));
    onSnapshot(q, (data) => {
      const posts = data.docs.map((post) => ({ ...post.data(), id: post.id }));
      setData(posts);
    });
  } catch (error) {
    Alert.alert(error.message);
    throw error;
  }
};

export const getDocsCount = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    const docsCount = snapshot.size;
    return docsCount;
  } catch (error) {
    Alert.alert(error.message);
    console.error("Error fetching docs:", error);
    return 0;
  }
};

export const uploadPhoto = async (photo, directory) => {
  try {
    const response = await fetch(photo);
    const file = await response.blob();
    const storageRef = ref(storage, `${directory}/${uuidv4()}`);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    return photoURL;
  } catch (error) {
    Alert.alert(error.message);
    throw error;
  }
};
