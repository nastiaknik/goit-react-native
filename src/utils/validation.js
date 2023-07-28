import { Alert } from "react-native";

export const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.trim()) {
    Alert.alert("Error", "Please enter your email.");
    return false;
  }
  if (!emailRegex.test(email.trim())) {
    Alert.alert("Error", "Please enter a valid email address.");
    return false;
  }
  return true;
};

export const validatePassword = (password) => {
  if (!password.trim()) {
    Alert.alert("Error", "Please enter your password.");
    return false;
  }
  if (password.trim().length < 6) {
    Alert.alert("Error", "Password should be at least 6 characters long.");
    return false;
  }
  return true;
};

export const validateLogin = (login) => {
  if (!login.trim()) {
    Alert.alert("Error", "Please enter your login.");
    return false;
  }
  return true;
};
