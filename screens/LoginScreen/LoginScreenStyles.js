import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 142,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    color: "#212121",
    /* fontFamily: "Roboto", */
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    /* fontFamily:"Roboto" */
    fontSize: 16,
    lineHeight: 18.75,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  inputFocused: { borderColor: "#FF6C00" },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  showPassword: {
    color: "#1B4371",
    /* fontFamily: "Roboto" */
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
    borderColor: "#FF6C00",
  },
  btnText: {
    textAlign: "center",
    /* fontFamily: "Roboto", */
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  registerText: {
    color: "#1B4371",
    padding: 16,
  },
  underlinedText: {
    textDecorationLine: "underline",
  },
});

export default styles;
