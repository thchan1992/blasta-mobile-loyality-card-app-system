import { useState } from "react";

export const useWarning = () => {
  const [warning, setWarning] = useState<string>("");

  const clearWarning = () => setWarning("");

  return { warning, setWarning, clearWarning };
};
