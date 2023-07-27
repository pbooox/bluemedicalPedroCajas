import {vehiclesApiUrl} from '../../../config/constant';

export const comienzaRegister = async() => {
  const url = `${vehiclesApiUrl}/register`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "DELETE"
  });
  const content = await resp.json();
  return content;

}