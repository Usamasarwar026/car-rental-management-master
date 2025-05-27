import { useState } from "react";

const useHideShowPassword = () => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return { isPasswordVisible, togglePasswordVisibility };
};

export default useHideShowPassword;
