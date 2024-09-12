import * as React from "react";
import {
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
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
import { PrimaryTextInput } from "@/components/PrimaryTextInput";
import { BigButton } from "@/components/BigButton";
import { useWarning } from "@/hooks/useWarning";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  // const [warning, setWarning] = React.useState<string>("");
  const { warning, setWarning } = useWarning();

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
    <SafeAreaView
      style={{
        alignItems: "center",
        flex: 1,
        borderWidth: 1,
        width: "100%",
        backgroundColor: "black",
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
              flex: 9,
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.titleText}>Create an Account</Text>
            <Text style={styles.text}>
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
            <Text style={styles.warningText}>{warning}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <BigButton title={"Sign up"} onPress={onSignUpPress} />
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
            <Text style={styles.titleText}>Confirm your email</Text>
            <Text style={styles.text}>
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
            <Text style={styles.warningText}>{warning}</Text>

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
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            <BigButton title={"Verify email"} onPress={onPressVerify} />
          </View>
        </>
      )}

      {/* }
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
