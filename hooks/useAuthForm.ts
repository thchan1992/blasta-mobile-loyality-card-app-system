import { useState } from "react";

import { useWarning } from "@/hooks/useWarning";

export const useAuthForm = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { warning, setWarning } = useWarning();
  const [code, setCode] = useState("");

  return {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    warning,
    setWarning,
    code,
    setCode,
  };
};
