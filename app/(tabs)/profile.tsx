import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Text, View, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fifthColor, primaryColor } from "../util/color";
export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // const [data, setData] = useState("");
  // useEffect(() => {
  //   // fetchData();
  //   setIsLoading(false);
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("API_URL");
  //     setData(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: primaryColor,
      }}
    >
      <SignedIn>
        <Text style={{ fontWeight: "bold", color: "white" }}>
          {user?.emailAddresses[0].emailAddress}
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            borderWidth: 1,
            padding: 20,
            margin: 20,
            backgroundColor: fifthColor,
          }}
          onPress={async () => {
            await signOut();
            const res = await SecureStore.deleteItemAsync("userId");
            router.replace("/(auth)");
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity>
      </SignedIn>
    </View>
  );
}
