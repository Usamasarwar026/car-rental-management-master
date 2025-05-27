import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/slices/store";
import { useEffect } from "react";
import { getAllUsers } from "@/store/slices/authSlice";

const useUserInfo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { allUsers } = useAppSelector((state) => state.authStore);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const user = allUsers?.find((c) => c.id === id);

  return { user };
};

export default useUserInfo;
