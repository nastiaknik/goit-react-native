import { StyleSheet } from "react-native";

const createStyles = (dimensions) => {
  return StyleSheet.create({
    bgImage: {
      flex: 1,
      resizeMode: "cover",
      width: dimensions.width,
      height: dimensions.height + 142,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      width: dimensions.width,
      height: dimensions.height,
    },
    form: {
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 16,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      position: "relative",
    },
    title: {
      marginTop: 32,
      marginBottom: 32,
      fontFamily: "Roboto-Medium",
      fontSize: 30,
      fontWeight: 500,
      letterSpacing: 0.01,
      lineHeight: 35,
      color: "#212121",
    },
    input: {
      width: "100%",
      height: 50,
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 15,
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      lineHeight: 19,
      color: "#212121",
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "#E8E8E8",
      backgroundColor: "#F6F6F6",
    },
    inputFocused: {
      borderColor: "#FF6C00",
      backgroundColor: "#ffffff",
    },
    inputContainer: {
      position: "relative",
      width: "100%",
    },
    showPassword: {
      color: "#1B4371",
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      lineHeight: 19,
    },
    showPasswordBtn: {
      position: "absolute",
      bottom: 16,
      right: 16,
      paddingTop: 16,
      paddingBottom: 15,
    },
    btn: {
      marginTop: 27,
      width: "100%",
      borderRadius: 100,
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: "#FF6C00",
      borderWidth: 1,
      borderColor: "transparent",
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    btnText: {
      textAlign: "center",
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      lineHeight: 19,
      color: "#ffffff",
    },
    registerText: {
      color: "#1B4371",
      padding: 16,
      lineHeight: 19,
      fontFamily: "Roboto-Regular",
    },
    underlinedText: {
      textDecorationLine: "underline",
    },
  });
};

export default createStyles;
