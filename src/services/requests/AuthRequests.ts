import axios from 'axios';
import { api_base } from '../constants/Constants';

export const signup = async (firstName: string, lastName:string, email: string, password: string): Promise<void> => {
  const response = await axios.post<void>(`${api_base}/auth/signup`, { firstName, lastName, email, password });
  return response.data;
};

export const login = async (email: string, password: string): Promise<void> => {
  const response = await axios.post<void>(`${api_base}/auth/login`, { email, password });
  return response.data;
};
