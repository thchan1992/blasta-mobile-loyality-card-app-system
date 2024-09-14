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
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    warning,
    setWarning,
  } = useAuthForm();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        unsafeMetadata: {
          accountType: "customer",
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setWarning("");
      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      setWarning("Email has been taken.");
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        // console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setWarning("Verification code is not correct.");
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
    }
  };

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
