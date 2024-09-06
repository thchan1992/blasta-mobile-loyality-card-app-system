import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as SecureStore from "expo-secure-store";
import {
  fifthColor,
  fourthColor,
  primaryColor,
  secondaryColor,
  thirdColor,
} from "../util/color";

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
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[secondaryColor, primaryColor]}
        style={styles.container}
      >
        <SignedIn>
          {!isLoading && qrCodeValue ? (
            <View>
              <View style={styles.title}>
                <Text style={styles.titleText}> Scan your Code </Text>
              </View>
              <View style={styles.qrCodeContainer}>
                <QRCode value={qrCodeValue} size={200} />
              </View>
            </View>
          ) : (
            <View>
              <Text>No QR code is found, please sign in again</Text>
            </View>
          )}
        </SignedIn>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColor,
  },
  qrCodeContainer: {
    borderRadius: 20,
    borderWidth: 3,
    padding: 10,
    backgroundColor: "white",
    borderColor: "white",
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  title: { justifyContent: "center", alignItems: "center", padding: 10 },
  titleText: {
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    color: fourthColor,
  },
});
