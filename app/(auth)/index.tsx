import React from "react";
import { SignedOut } from "@clerk/clerk-expo";
import { View, SafeAreaView, Text } from "react-native";
import { BigButton } from "@/components/BigButton";
import { sharedStyles } from "@/app/util/styles";
export default function Page() {
  return (
    <SafeAreaView style={sharedStyles.onBoardingContainer}>
      <SignedOut>
        <View style={sharedStyles.bodyContainer}>
          <Text style={sharedStyles.title}>BLASTA</Text>
        </View>
        <View style={sharedStyles.bottomContainer}>
          <BigButton link={"/registration"} title={"Get Started"} />
        </View>
      </SignedOut>
    </SafeAreaView>
  );
}
