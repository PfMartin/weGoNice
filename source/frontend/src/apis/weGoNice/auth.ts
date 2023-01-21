import { url, headers, handleError, addAuthorization } from './utils';
import axios from 'axios';
import store from '@/store';

export const refreshToken = async (): Promise<void> => {
  const token = store.getters['auth/sessionToken'];
  headers.Authorization = addAuthorization(token);
  try {
    const { data } = await axios.get(`${url}/auth/token`, {
      headers,
    });

    data.token && store.dispatch('setSessionToken', token);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
      return;
    }

    console.error(`An unexpected error occurred: ${error}`);
  }
};

export const registerUser = async (body: {
  email: string;
  password: string;
}): Promise<WeGoNiceApi.RequestResponse> => {
  try {
    const res = await axios.post(`${url}/auth/register`, body, {
      headers,
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<WeGoNiceApi.RequestResponse> => {
  try {
    const res = await axios.post(`${url}/auth/login`, body, {
      headers,
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};
