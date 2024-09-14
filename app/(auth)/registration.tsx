import React from "react";
import { SafeAreaView, View } from "react-native";
import { BigButton } from "@/components/BigButton";
import { sharedStyles } from "../util/styles";

export default function Registration() {
  return (
    <SafeAreaView style={sharedStyles.onBoardingContainer}>
      <View style={sharedStyles.onBoardingBodyContainer}></View>
      <View style={sharedStyles.bottomContainer}>
        <BigButton link={"/sign-up"} title={"Sign up"} />
        <BigButton link={"/sign-in"} title={"Sign in"} customColor="black" />
      </View>
    </SafeAreaView>
  );
}
