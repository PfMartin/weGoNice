import { url, headers, handleError } from './utils';
import axios from 'axios';
import store from '@/store';

export const createAuthor = async (
  body: Authors.CreateAuthorBody
): Promise<WeGoNiceApi.RequestResponse> => {
  headers.Authorization = `Bearer ${store.getters['auth/sessionToken']}`;

  try {
    const res = await axios.post(`${url}/authors`, body, {
      headers,
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllAuthors = async () => {
  headers.Authorization = `Bearer ${store.getters['auth/sessionToken']}`;

  try {
    const res = await axios.get(`${url}/authors`, {
      headers,
    });

    return res.data;
  } catch (error) {
    return handleError(error);
  }
};
