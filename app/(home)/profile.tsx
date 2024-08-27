import React from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
