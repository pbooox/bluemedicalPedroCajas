import {vehiclesApiUrl} from '../../../config/constant';

export const getPayment = async() => {
  const url = `${vehiclesApiUrl}/vehicles/payment`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const content = await resp.json();
  // return content.vehicles;
  // console.log(content)

  const vehicles = content.vehicles.map( v => ({
    plate: v.plate,
    minutes: v.minutes,
    total: v.total
  }))
  return vehicles;

}