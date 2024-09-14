import { StyleSheet } from "react-native";
import { getScreenHeight, getScreenWidth } from "./dimensions";
import { BackButtonBar } from "@/components/BackButtonBar";

export const sharedStyles = StyleSheet.create({
  onBoardingContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    width: "100%",
  },
  onBoardingBodyContainer: {
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
  mainContainer: {
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    width: "100%",
    backgroundColor: "black",
  },
  headerContainer: {
    flex: 1,
    borderBottomWidth: 2,
    width: "100%",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
    flex: 9,
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: getScreenHeight() * 0.03,
    padding: 10,
    fontWeight: "bold",
    color: "white",
  },
  descText: {
    fontSize: getScreenHeight() * 0.02,
    paddingLeft: 10,
    color: "white",
  },
  warningText: {
    color: "red",
    paddingLeft: 10,
  },
});
