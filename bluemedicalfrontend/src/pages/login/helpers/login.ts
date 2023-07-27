import {usersApiUrl} from '../../../config/constant';

export const LoginHp = async(user: any) => {
  console.log(user)
  const url = `${usersApiUrl}/login`;
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