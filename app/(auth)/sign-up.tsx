import * as React from "react";
import {
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { FormContainer } from "@/components/FormContainer";
import { getScreenHeight, getScreenWidth } from "../util/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import {
  fourthColor,
  primaryColor,
  secondaryColor,
  thirdColor,
} from "../util/color";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [warning, setWarning] = React.useState<string>("");

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
        setWarning("Verification code is not correct.");
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <LinearGradient colors={[secondaryColor, primaryColor]} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          borderWidth: 1,
          width: "100%",
        }}
      >
        {/* <FormContainer
        child={ */}
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
        {!pendingVerification && (
          <>
            <View
              style={{
                width: "100%",
                // width: getScreenWidth() * 0.8,
                // height: getScreenHeight() * 0.5,
                flex: 9,
                // justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ marginLeft: 15, marginTop: 15 }}>Email</Text>
              <TextInput
                onFocus={() => {
                  borderWidth: 1;
                }}
                style={{
                  // borderWidth: 1,
                  width: "95%",
                  height: getScreenHeight() * 0.08,
                  margin: 10,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
              />
              <Text style={{ marginLeft: 15 }}>Password</Text>
              <TextInput
                style={{
                  // borderWidth: 1,
                  width: "95%",
                  height: getScreenHeight() * 0.08,
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

              <Text style={{ color: "red", paddingLeft: 15 }}>{warning}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              <TouchableOpacity
                onPress={onSignUpPress}
                style={{
                  // borderWidth: 1,
                  width: getScreenWidth() * 0.95,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: thirdColor,
                  borderRadius: 40,
                  height: getScreenHeight() * 0.08,
                }}
              >
                <Text>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {pendingVerification && (
          <>
            <View
              style={{
                width: "100%",
                // width: getScreenWidth() * 0.8,
                // height: getScreenHeight() * 0.5,
                flex: 9,
                // justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: getScreenHeight() * 0.03,
                  fontWeight: "bold",
                  paddingLeft: 15,
                }}
              >
                Confirm your email
              </Text>
              <Text
                style={{
                  fontSize: getScreenHeight() * 0.02,

                  paddingLeft: 15,
                }}
              >
                We sent a 6 digits code to your email.
              </Text>

              <TextInput
                style={{
                  borderWidth: 1,
                  width: "95%",
                  height: getScreenHeight() * 0.08,
                  margin: 10,
                  padding: 10,
                  borderRadius: 10,
                  textAlign: "center",
                  backgroundColor: "white",
                }}
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
              />

              {/* <Button title="Verify Email" onPress={onPressVerify} /> */}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              <TouchableOpacity
                onPress={onPressVerify}
                style={{
                  borderWidth: 1,
                  width: getScreenWidth() * 0.9,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: fourthColor,
                  borderRadius: 40,
                  height: getScreenHeight() * 0.08,
                }}
              >
                <Text>Verify Email</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* }
      /> */}
      </SafeAreaView>
    </LinearGradient>
  );
}
