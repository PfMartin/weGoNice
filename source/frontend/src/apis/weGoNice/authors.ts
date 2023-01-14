import { url, headers, handleError, addAuthorization } from './utils';
import axios from 'axios';

export const createAuthor = async (
  body: Authors.Author
): Promise<WeGoNiceApi.RequestResponse> => {
  headers.Authorization = addAuthorization();

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
  headers.Authorization = addAuthorization();

  try {
    const res = await axios.get(`${url}/authors`, {
      headers,
    });

    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAuthorById = async (id: string | string[]) => {
  headers.Authorization = addAuthorization();

  try {
    const res = await axios.get(`${url}/authors/${id}`, {
      headers,
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};
