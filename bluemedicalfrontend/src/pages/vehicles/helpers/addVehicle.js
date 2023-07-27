import {vehiclesApiUrl} from '../../../config/constant';

export const addVehicle = async(vehicle) => {
  const url = `${vehiclesApiUrl}/vehicles`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(vehicle)
  });
  const content = await resp.json();
  return content;

}