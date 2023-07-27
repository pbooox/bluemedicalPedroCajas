import {vehiclesApiUrl} from '../../../config/constant';

export const exitRegister = async(plate) => {
  const url = `${vehiclesApiUrl}/register/exit`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({plate: plate})
  });
  const content = await resp.json();
  return content;

}