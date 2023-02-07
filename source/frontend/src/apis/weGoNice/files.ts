import { url, handleError, addAuthorization } from './utils';
import axios from 'axios';

export const uploadFile = async (
  id: string | string[],
  file: any
): Promise<WeGoNiceApi.RequestResponse> => {
  const formData = new FormData();
  formData.append('picture', file);

  console.log(file);

  try {
    const res = axios.post(`${url}/files/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: addAuthorization(),
      },
    });
    return res;
  } catch (error) {
    return handleError(error);
  }
};
