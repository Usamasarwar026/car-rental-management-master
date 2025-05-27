import Link from "next/link";
import React from "react";
import { PageChangeType } from "@/types/types";


const PageChange: React.FC<PageChangeType> = ({ title, link, signUp, para }) => {
  return (
    <div className="mb-5">
      <h1 className="text-[30px] font-[700] mb-2 text-center md:text-start dark:text-pure_white transition-all duration-300">
        {title}
      </h1>
      <p className="text-[18px] mb-6 text-dusty_blue text-center md:text-start">
        {para}{" "}
        <Link
          href={link ?? "#"}
          className="text-purple-600 font-[500] hover:underline"
        >
          {signUp}
        </Link>
      </p>
    </div>
  );
};

export default PageChange;
