import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
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
        username: login,
        photoURL: photo,
      });
      const updatedUser = auth.currentUser;
      return {
        user: {
          username: updatedUser.displayName,
          email: updatedUser.email,
          userId: updatedUser.uid,
          photo: updatedUser.photoURL,
        },
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
        user: {
          username: user.displayName,
          email: user.email,
          userId: user.uid,
          photo: user.photoURL,
        },
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
      await onAuthStateChanged(auth, (user) => setUser(user));
    } catch (error) {
      Alert.alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);
