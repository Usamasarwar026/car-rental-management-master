import LoginComp from "@/components/authentication/LoginComp";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/lib/authOption";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <LoginComp />
    </div>
  );
};

export default Login;
