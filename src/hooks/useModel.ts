import { useState } from "react";

const useModel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "modalRemove") {
      setIsOpen(false);
    }
  };
  return { isOpen,setIsOpen, handleIsOpen, handleOverlayClick, handleClose };
};

export default useModel;
