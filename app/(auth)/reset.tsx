import { View, SafeAreaView, Text } from "react-native";
import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { BackButtonBar } from "@/components/BackButtonBar";
import { PrimaryTextInput } from "@/components/PrimaryTextInput";
import { BigButton } from "@/components/BigButton";
import { useAuthForm } from "@/hooks/useAuthForm";
import { sharedStyles } from "../util/styles";

const PwReset = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    warning,
    setWarning,
    code,
    setCode,
  } = useAuthForm();

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
    <SafeAreaView style={sharedStyles.mainContainer}>
      {!successfulCreation && (
        <>
          <BackButtonBar />
          <View style={sharedStyles.bodyContainer}>
            <Text style={sharedStyles.titleText}>Reset your Password</Text>
            <Text style={sharedStyles.descText}>Enter your email to start</Text>
            <PrimaryTextInput
              title={"Email"}
              value={emailAddress}
              setter={setEmailAddress}
              placeholder="Email..."
              isPassword={false}
            />
            <Text style={sharedStyles.warningText}>{warning}</Text>
          </View>
          <View style={sharedStyles.bottomContainer}>
            <BigButton title="Set Reset Email" onPress={onRequestReset} />
          </View>
        </>
      )}

      {successfulCreation && (
        <>
          <BackButtonBar />
          <View style={sharedStyles.bodyContainer}>
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
          <View style={sharedStyles.bottomContainer}>
            <BigButton title="Set new Password" onPress={onReset} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default PwReset;
