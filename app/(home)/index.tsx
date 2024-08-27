import React from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Button title="Sign Out" onPress={() => signOut()} />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
