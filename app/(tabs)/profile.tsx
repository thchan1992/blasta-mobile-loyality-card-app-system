import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Text, View, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [data, setData] = useState("");
  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("API_URL");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View>
      <SignedIn>
        <Text>{!isLoading && "from the server:" + data}</Text>
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
