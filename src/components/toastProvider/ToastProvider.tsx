"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastProviderType } from "@/types/types";

const ToastProvider = ({ children }: ToastProviderType) => {
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" autoClose={4000} />
    </>
  );
};

export default ToastProvider;
