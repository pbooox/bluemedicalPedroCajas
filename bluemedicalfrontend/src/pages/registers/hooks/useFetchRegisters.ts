import { useEffect, useState } from "react";
import { getRegisters } from "../helpers/getRegister";

export const useFetchRegisters = () => {
  const [registers, setRegisters] = useState([]);

  const getReg = async () => {
    const newRegisters = await getRegisters();
    setRegisters(newRegisters); 
  }

  useEffect(()=> {
    getReg();
  }, [])

  return {
    registers, getReg
  }
}