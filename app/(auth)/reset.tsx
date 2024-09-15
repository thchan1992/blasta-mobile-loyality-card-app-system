import { View, SafeAreaView, Text } from "react-native";
import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { BackButtonBar } from "@/components/BackButtonBar";
import { PrimaryTextInput } from "@/components/PrimaryTextInput";
import { BigButton } from "@/components/BigButton";
import { useAuthForm } from "@/hooks/useAuthForm";
import { sharedStyles } from "../util/styles";
import { useRouter } from "expo-router";

const PwReset = () => {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();
  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    warning,
    code,
    setCode,
    successfulCreation,
    onRequestReset,
    onReset,
  } = useAuthForm({ signIn, setActive, router });

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
            <Text style={sharedStyles.warningText}>{warning}</Text>
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
