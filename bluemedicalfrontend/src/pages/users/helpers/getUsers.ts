import { usersApiUrl } from '../../../config/constant';

export const getUsers = async() => {
  const url = `${usersApiUrl}/users`;
  const resp = await fetch(url, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const content = await resp.json();
  
  const users: any = content.users.map( (user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
  return users;

}