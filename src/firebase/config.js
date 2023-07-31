import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDlF7y8rbqJs2kqtrHZhVhC3NofkO9VVkM",
  authDomain: "goit-react-native-3b247.firebaseapp.com",
  projectId: "goit-react-native-3b247",
  storageBucket: "goit-react-native-3b247.appspot.com",
  messagingSenderId: "552706884356",
  appId: "1:552706884356:web:b8a63a8deda15640068651",
  measurementId: "G-W0D84FFVSQ",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
