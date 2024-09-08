import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  fifthColor,
  fourthColor,
  primaryColor,
  secondaryColor,
  thirdColor,
} from "../util/color";
import { getScreenHeight, getScreenWidth } from "../util/dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FormContainer } from "@/components/FormContainer";
export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

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
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <LinearGradient
      colors={[secondaryColor, primaryColor]}
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderWidth: 1,
        width: "100%",
      }}
    >
      <FormContainer
        child={
          <View
            style={{
              width: getScreenWidth() * 0.8,
              height: getScreenHeight() * 0.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                borderWidth: 1,
                width: "90%",
                height: "10%",
                margin: 10,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "white",
              }}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
            <TextInput
              style={{
                borderWidth: 1,
                width: "90%",
                height: "10%",
                margin: 10,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "white",
              }}
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity
              onPress={onSignInPress}
              style={{
                borderWidth: 1,
                width: getScreenWidth() * 0.3,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: fourthColor,
                borderRadius: 5,
                height: getScreenHeight() * 0.08,
              }}
            >
              <Text>Sign In</Text>
            </TouchableOpacity>

            <View style={{ padding: 10 }}>
              <Text>Don't have an account?</Text>
              <Link href="/sign-up" style={{ paddingHorizontal: 10 }}>
                <Text>Sign up</Text>
              </Link>
            </View>
          </View>
        }
      />
    </LinearGradient>
  );
}
