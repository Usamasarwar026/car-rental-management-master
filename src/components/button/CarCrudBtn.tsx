"use client";
import React from "react";
import { CarCrudBtnType } from "@/types/types";

const CarCrudBtn = ({ title, onClick, style }: CarCrudBtnType) => {
  return (
    <>
      <button onClick={onClick} className={`${style}`}>
        {title}
      </button>
    </>
  );
};

export default CarCrudBtn;
