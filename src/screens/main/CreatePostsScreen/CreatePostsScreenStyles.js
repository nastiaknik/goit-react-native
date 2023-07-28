import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flex: 1,
    overflow: "hidden",
  },
  cameraWrapper: {
    width: "100%",
    height: 240,
    overflow: "hidden",
    borderRadius: 8,
    position: "relative",
  },
  camera: {
    flex: 1,
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
    backgroundColor: "#ffffff",
    borderRadius: 30,
  },
  cameraText: {
    marginTop: 8,
    marginBottom: 32,
    alignSelf: "flex-start",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    width: "100%",
    paddingVertical: 16,
    marginBottom: 16,
  },
  locationWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flexDirection: "row",
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    width: "100%",
    zIndex: 999,
  },
  location: {
    width: "100%",
    paddingVertical: 15,
    height: "100%",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 10,
  },
  publishBtn: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginBottom: 10,
  },
  publishText: {
    alignSelf: "center",
    fontSize: 16,
    lineHeight: 19,
  },
  deleteBtn: {
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    marginTop: "auto",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 34,
    paddingTop: 5,
    position: "relative",
    zIndex: -1,
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
});
