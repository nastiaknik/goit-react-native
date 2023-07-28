import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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
});
