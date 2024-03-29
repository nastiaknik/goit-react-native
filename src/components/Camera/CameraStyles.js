import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  cameraWrapper: {
    width: "100%",
    height: 240,
    overflow: "hidden",
    borderRadius: 8,
    position: "relative",
  },
  camera: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    borderWidth: 1,
    borderColor: "#F6F6F6",
  },
  cameraBtn: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF4D",
  },
  flipBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF4D",
    border: "1px solid #F6F6F6",
    borderRadius: "50%",
    padding: 8,
    bottom: 12,
    right: 12,
  },
  addPhoto: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #F6F6F6",
    padding: 8,
    bottom: 12,
    left: 12,
  },
  cameraText: {
    marginTop: 8,
    marginBottom: 32,
    alignSelf: "flex-start",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
});
