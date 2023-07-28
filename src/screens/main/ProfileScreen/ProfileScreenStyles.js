import { StyleSheet } from "react-native";

const createStyles = (dimensions) => {
  return StyleSheet.create({
    bgImage: {
      flex: 1,
      resizeMode: "cover",
      width: dimensions.width,
      height: "100%",
      height: dimensions.height + 142,
      justifyContent: "flex-end",
    },
    container: {
      position: "relative",
      justifyContent: "flex-end",
    },
    form: {
      marginTop: 202,
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingHorizontal: 16,
      paddingBottom: 43,
    },
    avatarWrapper: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      position: "relative",
      zIndex: 1000,
    },
    avatar: {
      position: "absolute",
      top: -60,
      left: "auto",
      width: 120,
      height: 120,
      borderRadius: 16,
      backgroundColor: "#F6F6F6",
    },
    image: { width: 120, height: 120, borderRadius: 16, overflow: "hidden" },
    photo: { width: "100%", height: 240, borderRadius: 8 },
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
      fontFamily: "Roboto-Medium",
      fontSize: 30,
      lineHeight: 35,
      color: "#212121",
      marginBottom: 32,
    },
    post: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
      marginVertical: 16,
    },
    lastPost: { paddingBottom: 202 },
    postTitle: {
      marginTop: 8,
      fontFamily: "Roboto-Medium",
      fontSize: 16,
      lineHeight: 19,
      color: "#212121",
    },
    infoWrapper: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
    },
    interactions: {
      display: "flex",
      flexDirection: "row",
      gap: 24,
    },
    btn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    postComments: {
      marginLeft: 6,
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      lineHeight: 19,
      color: "#212121",
    },
    postLocation: {
      marginLeft: 9,
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      lineHeight: 19,
      color: "#212121",
      textDecorationLine: "underline",
    },
    logoutBtn: { position: "absolute", top: 22, right: 16 },
  });
};

export default createStyles;
