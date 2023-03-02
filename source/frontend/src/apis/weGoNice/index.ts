import axios from 'axios';
import { url, headers, handleError } from './utils';

export const getAllRecipes = async (
  token: string
): Promise<WeGoNiceApi.RequestResponse> => {
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
