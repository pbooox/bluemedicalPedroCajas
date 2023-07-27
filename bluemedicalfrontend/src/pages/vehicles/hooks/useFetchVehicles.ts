import { useEffect, useState } from "react";
import { getVehicles } from "../helpers/getVehicles";

export const useFetchVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  const getVe = async () => {
    const newVehicles = await getVehicles();
    setVehicles(newVehicles); 
  }

  useEffect(()=> {
    getVe();
  }, [])

  return {
    vehicles, getVe
  }
}