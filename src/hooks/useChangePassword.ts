import { changePassword } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/slices/store";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

const useChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authStore);
  const session = useSession();

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setLocalError("All fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    const data = {
      id: session.data?.user.id as string,
      oldPassword,
      newPassword,
      confirmPassword,
    };
    try {
      await dispatch(changePassword(data)).unwrap();
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";

      if (typeof error === "string") {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setLocalError(errorMessage);
    }
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    localError,
    loading,
    handlePasswordChange,
  };
};

export default useChangePassword;
