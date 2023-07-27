import {usersApiUrl} from '../../../config/constant';

export const addUser = async(user: any) => {
  const url = `${usersApiUrl}/users`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(user)
  });
  const content = await resp.json();
  return content;

}