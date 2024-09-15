import { useCallback, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useWarning } from "@/hooks/useWarning";
import { Router } from "expo-router";

export const useAuthForm = ({
  signIn,
  setActive,
  isLoaded,
  router,
  signUp,
}: {
  signIn?: any;
  setActive: any;
  isLoaded?: boolean;
  router: Router;
  signUp?: any;
}) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { warning, setWarning } = useWarning();
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await SecureStore.deleteItemAsync("userId");
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

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
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
      setWarning("Verification code is not correct.");
      // alert(err.errors[0].message);
    }
  };

  return {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    warning,
    setWarning,
    code,
    setCode,
    onSignInPress,
    setPendingVerification,
    pendingVerification,
    onSignUpPress,
    onPressVerify,
    successfulCreation,
    setSuccessfulCreation,
    onRequestReset,
    onReset,
  };
};
