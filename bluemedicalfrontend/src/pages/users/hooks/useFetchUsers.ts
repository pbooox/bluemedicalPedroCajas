import { useEffect, useState } from "react";
import { getUsers } from "../helpers/getUsers";

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);

  const getUs = async () => {
    const newUsers = await getUsers();
    setUsers(newUsers); 
  }

  useEffect(()=> {
    getUs();
  }, [])

  return {
    users, getUs
  }
}