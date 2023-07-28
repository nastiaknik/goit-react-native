import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 5,
    flex: 1,
  },
  text: {
    fontSize: 50,
    fontFamily: "Roboto-Blackitalic",
  },
  inputText: {
    padding: 15,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  input: {
    position: "relative",
    height: 50,
    width: "100%",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 22,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
  },
  sendBtn: {
    position: "absolute",
    top: 7,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});
