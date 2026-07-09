import { addCar } from "@/store/slices/carCrudSlice";
import { useAppDispatch } from "@/store/slices/store";
import { useState } from "react";
import { toast } from "react-toastify";

const useAddCar = () => {
  const [brand, setBrand] = useState<string>("");
  const [carName, setCarName] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [seat, setSeat] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [engineType, setEngineType] = useState<string>("");
  const [transmissionType, setTransmissionType] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
       
      };
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    try {
      e.preventDefault();

      const carData = {
        brand,
        carName,
        model,
        seat,
        mileage,
        engineType,
        transmissionType,
        price,
        carType,
        description,
        image,
      };
    

      await dispatch(addCar(carData)).unwrap();

      toast.success("Congratulation! Car added successfully");
      setBrand("");
      setCarName("");
      setModel("");
      setSeat("");
      setMileage("");
      setEngineType("");
      setTransmissionType("");
      setPrice("");
      setCarType("");
      setDescription("");
      setImage("");
    } catch(error) {
      console.error("Error saving car:", error);
      toast.error(`Error saving car: ${error || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    brand,
    setBrand,
    carName,
    setCarName,
    model,
    setModel,
    seat,
    setSeat,
    mileage,
    setMileage,
    engineType,
    setEngineType,
    transmissionType,
    setTransmissionType,
    price,
    setPrice,
    carType,
    setCarType,
    description,
    setDescription,
    image,
    submitHandler,
    handleImageChange,
    loading,
  };
};

export default useAddCar;
