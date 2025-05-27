"use client";
import { useAllUsers } from "@/hooks/allUsers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UsersListCard = () => {
  const { allUsers } = useAllUsers();
  return (
    <>
      {allUsers?.map((user) => (
        <Link
          href={`/dashboard/userInfo/${user.id}`}
          key={user.id}
          className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-charcoal_black transition-all duration-300"
        >
          {user.profilePhoto ? (
            <Image
              src={user.profilePhoto}
              alt="Avatar"
              width={200}
              height={200}
              className="w-16 h-16 rounded-full border-2 aspect-[3/2] border-gray-300"
            />
          ) : (
            <FaUserCircle className="w-16 h-16 text-gray-400" />
          )}

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-all duration-300">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600 dark:text-storm_gray transition-all duration-300">
              {user.email}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default UsersListCard;
