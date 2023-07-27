import { useEffect, useState } from "react"
import { getTypesSel } from "../../types/helpers/getTypesSel"

export const useFetchTypesSel = () => {
  const [types, setTypes] = useState([]);

  const getTypes = async () => {
    const newTypes = await getTypesSel();
    setTypes(newTypes);
  }

  useEffect(() => {
    getTypes();
  }, []);
  

  return {
    types, getTypes
  }
}