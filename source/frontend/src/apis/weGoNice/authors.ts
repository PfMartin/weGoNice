import { url, headers, handleError } from './utils';
import axios from 'axios';

export const createAuthor = async (
  body: Authors.CreateAuthorBody,
  token: string
): Promise<WeGoNiceApi.RequestResponse> => {
  headers.Authorization = `Bearer ${token}`;

  try {
    const res = await axios.post(`${url}/authors`, body, {
      headers,
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};
