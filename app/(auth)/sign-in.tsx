import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { BigButton } from "@/components/BigButton";
import { PrimaryTextInput } from "@/components/PrimaryTextInput";
import { sharedStyles } from "../util/styles";
import { BackButtonBar } from "@/components/BackButtonBar";
import { useAuthForm } from "@/hooks/useAuthForm";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    warning,
    setWarning,
  } = useAuthForm();

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      setWarning("The email or password is not correct.");
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView style={sharedStyles.mainContainer}>
      <BackButtonBar />
      <View style={sharedStyles.bodyContainer}>
        <Text style={sharedStyles.titleText}>Log in to your Account</Text>
        <Text style={sharedStyles.descText}>
          Enter your email to log in to your account
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
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.smallText}>Forgot password?</Text>
          <Link href="/reset">
            <TouchableOpacity>
              <Text style={styles.linkText}>Click here</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View style={sharedStyles.bottomContainer}>
        <BigButton title="Sign in" onPress={() => onSignInPress()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  smallText: { color: "white" },
  linkText: {
    paddingLeft: 10,
    paddingTop: 2,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#a2abfe",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
  },
});
