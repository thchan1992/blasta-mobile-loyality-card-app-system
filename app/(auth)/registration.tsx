import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import { fourthColor, primaryColor, secondaryColor } from "../util/color";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getScreenWidth } from "../util/dimensions";

export default function Registration() {
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
      <View style={{ flex: 3 }}>
        <Text>Hello</Text>
      </View>
      <View style={{ flex: 1, margin: 10 }}>
        <Link
          href="/sign-up"
          style={{
            height: "50%",
            width: "80%",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: fourthColor,
              borderRadius: 40,
              width: getScreenWidth() * 0.9,
              height: "95%",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>

        <Link
          href="/sign-in"
          style={{
            height: "50%",
            width: "80%",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              borderRadius: 40,
              width: getScreenWidth() * 0.9,
              height: "95%",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              borderWidth: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}
