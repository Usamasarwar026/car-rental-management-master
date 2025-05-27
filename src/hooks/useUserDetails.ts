import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/slices/store";
import { fetchUserDetails, updateUser } from "@/store/slices/userDetailsSlice";
import { toast } from "react-toastify";
import { userDetailsProps } from "@/types/types";

const useUserDetails = () => {
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector((state) => state.userDetailStore);

  useEffect(() => {
    setLoading(true);
    if (userDetails) {
      setEmail(userDetails.email || "");
      setCity(userDetails.city || "");
      setStreet(userDetails.street || "");
      setDateOfBirth(
        userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth) : null
      );
      setGender(userDetails.gender || "");
      setProfilePhoto(userDetails.profilePhoto);
      setLoading(false);
    } else {
      dispatch(fetchUserDetails())
        .unwrap()
        .then(() => setLoading(false))
        .catch(() => {
          setErrorMessage("Error fetching user details");
          setLoading(false);
        });
    }
  }, [dispatch, userDetails]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
    }
  };

  const updateHandler = async () => {
    setLoading(true);
    try {
      const updatedData: Partial<userDetailsProps> = {
        id: userDetails?.id,
        email,
        city,
        street,
        dateOfBirth: dateOfBirth || undefined,
        gender,
      };
      console.log("new data",updatedData);

      if (profilePhoto && profilePhoto !== userDetails?.profilePhoto) {
        updatedData.profilePhoto = profilePhoto;
      }

      await dispatch(updateUser(updatedData)).unwrap();
      toast.success("User updated successfully");
    } catch {
      toast.error("Something went wrong in updating");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errorMessage,
    email,
    city,
    setCity,
    street,
    setStreet,
    dateOfBirth,
    setDateOfBirth,
    gender,
    setGender,
    profilePhoto,
    handleImageChange,
    updateHandler,
  };
};

export default useUserDetails;
