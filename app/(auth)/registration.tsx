import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, SafeAreaView, Text, View } from "react-native";
import { fourthColor, primaryColor, secondaryColor } from "../util/color";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getScreenWidth } from "../util/dimensions";
import { BigButton } from "@/components/BigButton";

export default function Registration() {
  return (
    <SafeAreaView
      // colors={["black"]}
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderWidth: 1,
        width: "100%",
      }}
    >
      <View style={{ flex: 5 }}></View>
      <View style={{ flex: 1, marginBottom: 10, paddingBottom: 20 }}>
        {/* <Link
          href="/sign-up"
          style={{
            height: "50%",
            width: "80%",
          }}
        >
          <TouchableOpacity
            style={[
              {
                backgroundColor: fourthColor,
                borderRadius: 40,
                width: getScreenWidth() * 0.9,
                height: "95%",
                justifyContent: "center",
                alignItems: "center",
                margin: 5,
              },
              Platform.OS === "android" && { padding: 10 },
            ]}
          >
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link> */}
        <BigButton link={"/sign-up"} title={"Sign up"} />
        <BigButton link={"/sign-in"} title={"Sign in"} customColor="black" />

        {/* <Link
          href="/sign-in"
          style={{
            height: "50%",
            width: "80%",
          }}
        >
          <TouchableOpacity
            style={[
              {
                backgroundColor: "grey",
                borderRadius: 40,
                width: getScreenWidth() * 0.9,
                height: "95%",
                justifyContent: "center",
                alignItems: "center",
                margin: 5,
                borderWidth: 2,
              },
              Platform.OS === "android" && { padding: 10 },
            ]}
          >
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </Link> */}
      </View>
    </SafeAreaView>
  );
}
