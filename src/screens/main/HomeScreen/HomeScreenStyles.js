import { StyleSheet } from "react-native";

const createStyles = ({ width, height }) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#ffffff",
    },
    header: {
      height: height > width ? 88 : 55,
      borderBottomColor: "#BDBDBD",
      borderBottomWidth: 0.5,
      boxShadow: "0px 0.5px 0px 0px #0000004D",
    },
    headerTitle: {
      fontFamily: "Roboto-Medium",
      fontSize: 17,
      lineHeight: 22,
      marginBottom: height > width ? 10 : 0,
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
      marginBottom: height > width ? 11 : 0,
    },
  });
};

export default createStyles;
