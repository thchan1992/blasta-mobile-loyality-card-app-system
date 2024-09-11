import React from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, Button, Platform } from "react-native";
import {
  fourthColor,
  primaryColor,
  secondaryColor,
  thirdColor,
} from "../util/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { getScreenHeight, getScreenWidth } from "../util/dimensions";
import { BigButton } from "@/components/BigButton";
export default function Page() {
  const { user } = useUser();

  return (
    <LinearGradient
      colors={[secondaryColor, primaryColor]}
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderWidth: 1,
        width: "100%",
      }}
    >
      <SignedOut>
        <View style={{ flex: 6 }}></View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <BigButton link={"/registration"} title={"Get Started"} />
        </View>
      </SignedOut>
    </LinearGradient>
  );
}
