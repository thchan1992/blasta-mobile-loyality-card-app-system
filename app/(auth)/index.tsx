import React from "react";
import { SignedOut } from "@clerk/clerk-expo";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import { BigButton } from "@/components/BigButton";
import { sharedStyles } from "@/app/util/styles";
import { getScreenHeight } from "../util/dimensions";
export default function Page() {
  return (
    <SafeAreaView style={sharedStyles.onBoardingContainer}>
      <SignedOut>
        <View style={sharedStyles.onBoardingBodyContainer}>
          <Text style={styles.title}>BLASTA</Text>
        </View>
        <View style={sharedStyles.bottomContainer}>
          <BigButton link={"/registration"} title={"Get Started"} />
        </View>
      </SignedOut>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: getScreenHeight() * 0.05,
    color: "white",
  },
});
