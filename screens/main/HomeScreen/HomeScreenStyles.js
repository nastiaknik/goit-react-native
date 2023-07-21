import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 88,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 0.5,
    boxShadow: "0px 0.5px 0px 0px #0000004D",
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
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
  logoutBtn: { marginRight: 16, padding: 10 },
  goBackBtn: { marginLeft: 16, paddingVertical: 10 },
});
