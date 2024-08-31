import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as SecureStore from "expo-secure-store";

export default function Page() {
  const { user } = useUser();
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getValue() {
      try {
        const result = await SecureStore.getItemAsync("userId");
        if (result) {
          //getting the userId from local storage
          setUserId(result);
        } else {
          //setting the userId to local storage
          await SecureStore.setItemAsync("userId", user!.id!);
          setUserId(user!.id!);
        }
      } catch (error) {
        console.error("Error fetching secure store value", error);
        return false;
      }
    }
    getValue();
    setIsLoading(false);
  }, []);

  const qrCodeValue = userId || (user ? user.id : "");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SignedIn>
        {!isLoading && qrCodeValue ? (
          <View>
            <Text>QR Code</Text>
            <QRCode value={qrCodeValue} size={200} />
          </View>
        ) : (
          <View>
            <Text>No QR code is found, please sign in again</Text>
          </View>
        )}
      </SignedIn>
    </View>
  );
}
