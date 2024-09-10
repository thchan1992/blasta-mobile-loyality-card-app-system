import React from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, Button } from "react-native";
import {
  fourthColor,
  primaryColor,
  secondaryColor,
  thirdColor,
} from "../util/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { getScreenHeight, getScreenWidth } from "../util/dimensions";
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
          <Link
            href="/registration"
            style={{
              height: "70%",
              width: "50%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: fourthColor,
                borderRadius: 40,
                width: getScreenWidth() * 0.9,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Get started
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </LinearGradient>
  );
}
