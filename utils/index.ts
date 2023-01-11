import axios from 'axios';
import jwt_decode from "jwt-decode";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const createUser = async (response: any, addUser: any) => {
  // console.log(response);
  const decoded: { name: string, picture: string, sub: string} = jwt_decode(response.credential);

  const { name, picture, sub } = decoded; //get name picture and sub 

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  }


  addUser(user)
  await axios.post(`${process.env.BASE_URL}/api/auth`, user)
  
  // console.log(decoded);
  

}