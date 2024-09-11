import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, Image } from "react-native";
import React from "react";
import { getScreenHeight, getScreenWidth } from "../util/dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BigButton } from "@/components/BigButton";
import { PrimaryTextInput } from "@/components/PrimaryTextInput";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [warning, setWarning] = useState<string>("");

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
    <SafeAreaView
      style={{
        // justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderWidth: 1,
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          flex: 1,
          borderBottomWidth: 2,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Image
            style={{
              width: getScreenWidth() * 0.1,
              height: getScreenHeight() * 0.1,
            }}
            source={require("@/assets/images/chevron-left.png")}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",

          flex: 9,
          // justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: getScreenHeight() * 0.03,
            padding: 10,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Log in to your Account
        </Text>
        <Text
          style={{
            fontSize: getScreenHeight() * 0.02,
            paddingLeft: 10,
            color: "white",
          }}
        >
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

        <Text style={{ color: "red", paddingLeft: 10 }}>{warning}</Text>
        <View style={{ flexDirection: "row", paddingLeft: 10, paddingTop: 10 }}>
          <Text
            style={{
              color: "white",
            }}
          >
            Forgot password?
          </Text>
          <Link href="/reset">
            <TouchableOpacity>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingTop: 2,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  color: "#a2abfe",
                }}
              >
                Click here
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
        }}
      >
        <BigButton title="Sign in" onPress={() => onSignInPress()} />
      </View>
    </SafeAreaView>
  );
}
