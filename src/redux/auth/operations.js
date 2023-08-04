import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { db, auth } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, login, photo }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: login,
        photoURL: photo,
      });
      const updatedUser = auth.currentUser;
      const userDocRef = doc(db, "users", updatedUser.uid);
      await setDoc(userDocRef, {
        username: updatedUser.displayName,
        email: updatedUser.email,
        userId: updatedUser.uid,
        photo: updatedUser.photoURL,
      });
      return {
        username: updatedUser.displayName,
        email: updatedUser.email,
        userId: updatedUser.uid,
        photo: updatedUser.photoURL,
      };
    } catch (error) {
      Alert.alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return {
        username: user.displayName,
        email: user.email,
        userId: user.uid,
        photo: user.photoURL,
      };
    } catch (error) {
      Alert.alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await signOut(auth);
    } catch (error) {
      Alert.alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (setUser, { rejectWithValue }) => {
    try {
       onAuthStateChanged(auth, (user) => setUser(user));
    } catch (error) {
      Alert.alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);
  
export const updatePhoto = createAsyncThunk("auth/updatePhoto", async ({ userId, photo }, { rejectWithValue }) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: photo,
    });
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, {photo}, { merge: true }); 
    return {
      photo: photo,
    };
  } catch (error) {
    Alert.alert(error.message);
    return rejectWithValue(error.message);
  }
});
