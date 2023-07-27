import {vehiclesApiUrl} from '../../../config/constant';

export const getRegisters = async() => {
  const url = `${vehiclesApiUrl}/register`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const content = await resp.json();

  const registers = content.registers.map( register => ({
    id: register.id,
    plate: register.vehicle.plate,
    entry_time: register.entry_time,
    exit_time: register.exit_time
  }))
  return registers;

}