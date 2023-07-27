import {vehiclesApiUrl} from '../../../config/constant';

export const getTypesSel = async() => {
  const url = `${vehiclesApiUrl}/types`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const content = await resp.json();

  const types = content.types.map( type => ({
    id: type.id,
    name: type.name,
    payment: type.payment
  }))
  return types;

}