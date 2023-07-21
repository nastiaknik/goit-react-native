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
      height: dimensions.height - 60,
    },
    form: {
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 16,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingBottom: 45,
      position: "relative",
    },
    avatar: {
      position: "absolute",
      top: -60,
      left: "auto",
      width: 120,
      height: 120,
      zIndex: 1,
      borderRadius: 16,
      backgroundColor: "#F6F6F6",
    },
    icon: {
      position: "absolute",
      right: -13,
      bottom: 14,
      width: 25,
      height: 25,
    },
    title: {
      marginTop: 92,
      marginBottom: 32,
      fontFamily: "Roboto-Medium",
      fontSize: 30,
      fontWeight: 500,
      lineHeight: 35,
      letterSpacing: 0.01,
      color: "#212121",
    },
    username: {
      alignSelf: "center",
      marginTop: 92,
      marginBottom: 33,
      fontFamily: "Roboto-Medium",
      fontSize: 30,
      lineHeight: 35,
      color: "#212121",
    },
  });
};

export default createStyles;
