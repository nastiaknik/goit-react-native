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
    height: 50,
  },
  input: {
    position: "relative",
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
  photo: {
    height: 240,
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
    marginBottom: 32
  },
  date: {
    fontSize: 10,
    color: "#BDBDBD",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E8E8E8",
  },
  commentText: {
    overflow: "hidden",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  username: {
    overflow: "hidden",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    fontWeight: "700",
  },
  commentCont: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 6, 0.03)",
    overflow: "hidden",
    borderRadius: 10,
    padding: 16,
  },
  commentList: {
    justifyContent: "space-between",
    marginBottom: 32,
  },
});
