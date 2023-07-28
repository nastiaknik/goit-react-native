import { StyleSheet } from "react-native";

const createStyles = (dimensions) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#ffffff",
    },
    header: {
      minHeight: 88,
      borderBottomColor: "#BDBDBD",
      borderBottomWidth: 0.5,
      boxShadow: "0px 0.5px 0px 0px #0000004D",
    },
    headerTitle: {
      fontFamily: "Roboto-Medium",
      fontSize: 17,
      lineHeight: 22,
      paddingBottom: 11,
      marginBottom: 10,
    },
    createPostTab: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 70,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#FF6C00",
      color: "#FFFFFF",
    },
    goBackBtn: {
      marginLeft: 16,
      marginBottom: 11,
    },
  });
};

export default createStyles;
