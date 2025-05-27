import { useState } from "react";
import useUserDetails from "./useUserDetails";
import { useAppSelector } from "@/store/slices/store";

const useSearchBar = () => {
  const { cars } = useAppSelector((state) => state.carCrudStore);

  const { profilePhoto } = useUserDetails();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const suggestions = cars.filter((carBrand) =>
    carBrand?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    profilePhoto,
    searchTerm,
    setSearchTerm,
    isDropDownOpen,
    setIsDropDownOpen,
    suggestions,
  };
};

export default useSearchBar;
