import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { PrimaryTextInput } from "@/components/PrimaryTextInput";
import { BigButton } from "@/components/BigButton";
import { sharedStyles } from "../util/styles";
import { BackButtonBar } from "@/components/BackButtonBar";
import { useAuthForm } from "@/hooks/useAuthForm";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    warning,
    code,
    setCode,
    pendingVerification,
    onSignUpPress,
    onPressVerify,
  } = useAuthForm({ isLoaded, signUp, setActive, router });

  return (
    <SafeAreaView style={sharedStyles.mainContainer}>
      <BackButtonBar />
      {!pendingVerification && (
        <>
          <View style={sharedStyles.bodyContainer}>
            <Text style={sharedStyles.titleText}>Create an Account</Text>
            <Text style={sharedStyles.descText}>
              Enter your email to verify your account
            </Text>
            <PrimaryTextInput
              title="Email"
              value={emailAddress}
              setter={setEmailAddress}
              placeholder="Email"
              isPassword={false}
            />
            <PrimaryTextInput
              title="Password"
              value={password}
              setter={setPassword}
              placeholder="Password"
              isPassword={true}
            />
            <Text style={sharedStyles.warningText}>{warning}</Text>
          </View>
          <View style={sharedStyles.bottomContainer}>
            <BigButton title={"Sign up"} onPress={onSignUpPress} />
          </View>
        </>
      )}
      {pendingVerification && (
        <>
          <View style={sharedStyles.bodyContainer}>
            <Text style={sharedStyles.titleText}>Confirm your email</Text>
            <Text style={sharedStyles.descText}>
              We sent a 6 digits code to your email.
            </Text>
            <PrimaryTextInput
              title="Code"
              value={code}
              setter={setCode}
              isPassword={false}
              placeholder="Code..."
              customStyle={{ textAlign: "center" }}
            />
            <Text style={sharedStyles.warningText}>{warning}</Text>
          </View>
          <View style={sharedStyles.bottomContainer}>
            <BigButton title={"Verify email"} onPress={onPressVerify} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
