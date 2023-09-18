import axios, { AxiosError } from 'axios';
import { api_base } from '../constants/Constants';

export const signup = async (firstName: string, lastName:string, email: string, password: string): Promise<any> => {
 try {
  const response = await axios.post<void>(`${api_base}/auth/user/signup`, { firstName, lastName, email, password });
  if( response.status === 200) {
    return response.data;
  //not sucessful
  } else {
    return "Error";
  }
} catch (error) {
    console.error("Anmeldung fehlgeschlagen");
    return "Error";
}
  };

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post<void>(`${api_base}/auth/user/login`, { email, password });
 
    if( response.status === 200) {
      return response.data;
    //not sucessful
    } else {
      return "Error";
    }
  } catch (error) {
      console.error("Anmeldung fehlgeschlagen", error);
      return "Error";
  }
    };
