import {
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Text,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { primaryColor, secondaryColor } from "../util/color";
import { BackButtonBar } from "@/components/BackButtonBar";
import { PrimaryTextInput } from "@/components/PrimaryTextInput";
import { BigButton } from "@/components/BigButton";
import { getScreenHeight } from "../util/dimensions";
import { useWarning } from "@/hooks/useWarning";

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  const { warning, setWarning } = useWarning();
  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      // alert(err.errors[0].message);
      setWarning("Email dose not exist");
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    setWarning("");
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      setWarning(err.errors[0].message);
      // alert(err.errors[0].message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Stack.Screen options={{ headerBackVisible: !successfulCreation }} /> */}

      {!successfulCreation && (
        <>
          <BackButtonBar />
          <View style={styles.bodyContainer}>
            <Text style={styles.titleText}>Reset your Password</Text>
            <Text style={styles.text}>Enter your email to start</Text>
            <PrimaryTextInput
              title={"Email"}
              value={emailAddress}
              setter={setEmailAddress}
              placeholder="Email..."
              isPassword={false}
            />
            <Text style={styles.warningText}>{warning}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <BigButton title="Set Reset Email" onPress={onRequestReset} />
          </View>
        </>
      )}

      {successfulCreation && (
        <>
          <BackButtonBar />
          <View style={styles.bodyContainer}>
            <PrimaryTextInput
              title={"Code"}
              value={code}
              setter={setCode}
              placeholder="Code..."
              isPassword={false}
              customStyle={{ textAlign: "center" }}
            />
            <PrimaryTextInput
              title={"New Password"}
              value={password}
              setter={setPassword}
              placeholder="New Password..."
              isPassword={true}
            />
          </View>
          <View style={styles.bottomContainer}>
            <BigButton title="Set new Password" onPress={onReset} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
    alignItems: "center",
  },
  bodyContainer: {
    width: "100%",
    flex: 9,
    alignItems: "flex-start",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  titleText: {
    fontSize: getScreenHeight() * 0.03,
    padding: 10,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: getScreenHeight() * 0.02,
    paddingLeft: 10,
    color: "white",
  },
  warningText: { color: "red", paddingLeft: 15 },
});

export default PwReset;
