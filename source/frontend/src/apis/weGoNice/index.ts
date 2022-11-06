import axios from 'axios';
import { url, headers, store, handleError } from './utils';

export const getAllRecipes = async (token: string): Promise<any> => {
  headers.Authorization = `Bearer ${token}`;

  try {
    const res = await axios.get(`${url}/recipes`, {
      headers,
    });

    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return handleError(error);
  }
};
