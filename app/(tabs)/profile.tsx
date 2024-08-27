import React from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Text, View, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Button
          title="Sign Out"
          onPress={async () => {
            await signOut();
            const res = await SecureStore.deleteItemAsync("userId");
            console.log(res, " deleted ");
            router.replace("/(auth)");
          }}
        />
      </SignedIn>
    </View>
  );
}
