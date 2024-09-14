import { useState } from "react";

import { useWarning } from "@/hooks/useWarning";

export const useAuthForm = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { warning, setWarning } = useWarning();

  return {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    warning,
    setWarning,
  };
};
