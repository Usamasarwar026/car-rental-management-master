import React from "react";
import Link from "next/link";

const ForgetPassWithCheckBox = () => {
  return (
    <div className="flex items-center justify-between my-[20px] text-sm">
      <div className="flex items-center">
        <input type="checkbox" className="mr-2 text-red-500" />
        <label
          htmlFor="remember-me"
          className="text-light_grayish_blue font-[500] text-[16px]"
        >
          Remember me
        </label>
      </div>
      <Link
        href="/auth/forgetPassword"
        className="text-amethyst_purple font-[500] text-[16px]"
      >
        Forgot your password?
      </Link>
    </div>
  );
};

export default ForgetPassWithCheckBox;
