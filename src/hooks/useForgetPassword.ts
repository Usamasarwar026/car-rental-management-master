import { userForgetPassword, userNewPassword } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/slices/store";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [forgetError, setForgetError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const params = searchParams.get("token");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleForgetPass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setForgetError(null);
    try {
      await dispatch(userForgetPassword(email)).unwrap();
      toast.info("Please check your email!");
      setEmail("");
      router.push("/auth/login");
    } catch (err: unknown) {
      const message =
        typeof err === "string"
          ? err
          : "Something went wrong. Please try again.";
      setForgetError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setForgetError(null);
    try {
      if (!params) {
        setForgetError("Invalid or missing reset token.");
        return;
      }

      if (newPassword.length < 6) {
        setForgetError("Length must be 6 characters");
        return;
      }

      await dispatch(userNewPassword({ newPassword, token: params })).unwrap();
      toast.success("Congratulations! password updated.");
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(errorMessage);
      setForgetError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    newPassword,
    setNewPassword,
    handleForgetPass,
    forgetError,
    loading,
    handleNewPassword,
  };
};

export default useForgetPassword;
