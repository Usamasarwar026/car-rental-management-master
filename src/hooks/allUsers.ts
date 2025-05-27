import { getAllUsers } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/slices/store";
import { useEffect } from "react";

export const useAllUsers = () => {
  const dispatch = useAppDispatch();
  const { allUsers } = useAppSelector((state) => state.authStore);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return { allUsers };
};
