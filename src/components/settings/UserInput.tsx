import React from "react";
import { UserInputProps } from "@/types/types";

const UserInput: React.FC<UserInputProps> = ({
  icon,
  title,
  placeholder,
  type = "text",
  readOnly = false,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-cool_gray font-[500] mb-2 dark:text-light_gray_blue transition-all duration-300">
        {title}
      </label>
      <div className="flex items-center border border-pale_blue active:border- rounded-[10px] p-2 dark:text-cool_gray transition-all duration-300 dark:border-gunmetal_gray">
        {icon}
        <div className="w-full">
          {typeof placeholder === "string" ? (
            <input
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              type={type}
              placeholder={placeholder}
              readOnly={readOnly}
              className="w-full p-2 outline-none text-slate_gray dark:bg-transparent"
            />
          ) : (
            placeholder
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInput;
