import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("Step 0: Session state", { session, status });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        setLoginError("Invalid Credentials");
        return;
      }

      toast.success("You are logged in!");
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(`Invalid email or password: ${error.message}`);
      } else {
        setLoginError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    loginError,
    loading,
    handleSubmit,
  };
};

export default useLogin;
