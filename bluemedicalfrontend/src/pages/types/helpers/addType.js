import {vehiclesApiUrl} from '../../../config/constant';

export const addType = async(type) => {
  console.log(type)
  const url = `${vehiclesApiUrl}/types`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(type)
  });
  const content = await resp.json();
  return content;

}