import React from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, Button } from "react-native";
import { fourthColor, primaryColor, thirdColor } from "../util/color";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Page() {
  const { user } = useUser();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderWidth: 1,
      }}
    >
      {/* <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn> */}
      <SignedOut>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 0.5,
            borderWidth: 1,
            width: "70%",
            borderRadius: 10,
            shadowColor: "grey",
            shadowOpacity: 50,
            shadowRadius: 3,
            backgroundColor: thirdColor,
            borderColor: "grey",
          }}
        >
          <Link href="/sign-in">
            <TouchableOpacity
              style={{
                backgroundColor: fourthColor,
                borderRadius: 10,
                width: "100%",
                padding: 10,
                margin: 10,
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          {/* <View style={{ width: "100%", alignItems: "center" }}> */}
          <Link
            href="/sign-up"
            // style={{
            //   width: "100%",
            //   alignItems: "center",
            //   justifyContent: "center",
            // }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: fourthColor,
                borderRadius: 10,
                width: "100%",
                padding: 10,
                margin: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
          {/* </View> */}

          <TouchableOpacity>
            <Link href="/reset" style={{ padding: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Forget Password</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </SignedOut>
    </View>
  );
}
