import { StyleSheet } from "react-native";

const createStyles = ({ width, height }) => {
  return StyleSheet.create({
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
    logoutBtn: {
      marginRight: 16,
      paddingHorizontal: 5,
      marginBottom: height > width ? 5 : 0,
    },
    goBackBtn: {
      marginLeft: 16,
      marginBottom: height > width ? 11 : 0,
    },
  });
};

export default createStyles;
