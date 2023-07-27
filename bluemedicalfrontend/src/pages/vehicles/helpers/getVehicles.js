import {vehiclesApiUrl} from '../../../config/constant';

export const getVehicles = async() => {
  const url = `${vehiclesApiUrl}/vehicles`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const content = await resp.json();
  console.log(content)

  const vehicles = content.vehicles.map( vehicle => ({
    id: vehicle.id,
    plate: vehicle.plate,
    minutes: vehicle.minutes,
    type: vehicle.type.name
  }))
  return vehicles;

}