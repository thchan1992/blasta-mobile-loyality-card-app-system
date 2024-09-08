import * as React from "react";
import { TextInput, Button, View, TouchableOpacity, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { FormContainer } from "@/components/FormContainer";
import { getScreenHeight, getScreenWidth } from "../util/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { fourthColor, primaryColor, secondaryColor } from "../util/color";

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
            {!pendingVerification && (
              <>
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
                  onChangeText={(email) => setEmailAddress(email)}
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
                  onPress={onSignUpPress}
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
                  <Text>Sign Up</Text>
                </TouchableOpacity>
                <Text>{warning}</Text>
              </>
            )}
            {pendingVerification && (
              <>
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: "90%",
                    height: "10%",
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                  }}
                  value={code}
                  placeholder="Code..."
                  onChangeText={(code) => setCode(code)}
                />

                <TouchableOpacity
                  onPress={onPressVerify}
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
                  <Text>Verify Email</Text>
                </TouchableOpacity>
                {/* <Button title="Verify Email" onPress={onPressVerify} /> */}
              </>
            )}
          </View>
        }
      />
    </LinearGradient>
  );
}
