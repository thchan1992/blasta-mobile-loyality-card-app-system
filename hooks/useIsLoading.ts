import { useState } from "react";

export const useIsLoading = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  return { isLoading, setIsLoading };
};
