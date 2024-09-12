import React from "react";
import { SignedOut, useUser } from "@clerk/clerk-expo";
import { View, SafeAreaView, Text } from "react-native";
import { BigButton } from "@/components/BigButton";
import { getScreenHeight } from "../util/dimensions";
export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView
      // colors={["black", "white"]}
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderWidth: 1,
        width: "100%",
      }}
    >
      <SignedOut>
        <View
          style={{ flex: 6, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: getScreenHeight() * 0.05, color: "white" }}>
            BLASTA
          </Text>
        </View>
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
    </SafeAreaView>
  );
}
