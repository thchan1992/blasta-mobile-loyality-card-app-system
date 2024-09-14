import { StyleSheet } from "react-native";
import { getScreenHeight } from "./dimensions";

export const sharedStyles = StyleSheet.create({
  onBoardingContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    width: "100%",
  },
  bodyContainer: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  title: {
    fontSize: getScreenHeight() * 0.05,
    color: "white",
  },
});
