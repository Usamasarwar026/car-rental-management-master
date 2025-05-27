"use client";
import { TbLogout2 } from "react-icons/tb";
import useModel from "@/hooks/useModel";
import { LogoutModalProps } from "@/types/types";

const LogoutModal = ({
  onClick,
  title,
  para,
  className1,
  className2,
}: LogoutModalProps) => {
  const { isOpen, handleIsOpen, handleOverlayClick } = useModel();

  return (
    <>
      <button onClick={handleIsOpen} className={`${className1}`}>
        {title === "Logout" && (
          <TbLogout2 className="text-gray-600 w-[20px] dark:text-storm_gray" />
        )}
        <span className={`${className2}`}>{title}</span>
      </button>

      {isOpen && (
        <div
          id="modalRemove"
          onClick={handleOverlayClick}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-[10000]"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[350px] p-6 relative">
            <button
              onClick={handleIsOpen}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>

            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h2>
            <p className="text-gray-600 mt-2">{para}</p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={handleIsOpen}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={onClick}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutModal;
