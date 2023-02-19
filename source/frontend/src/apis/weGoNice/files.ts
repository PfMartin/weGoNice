import { url, handleError, addAuthorization } from './utils';
import axios from 'axios';

export const uploadFile = async (
  id: string | string[],
  file: any
): Promise<WeGoNiceApi.RequestResponse> => {
  const formData = new FormData();
  formData.append('picture', file);

  try {
    const res = await axios.post(`${url}/files/${id}`, formData, {
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

export const createImgUrl = async (
  fileName: string
): Promise<string | WeGoNiceApi.RequestResponse> => {
  try {
    const res: any = await axios.get(`${url}/files/${fileName}`, {
      responseType: 'arraybuffer',
    });

    const base64 = btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    return `data:;base64,${base64}`;
  } catch (error) {
    return handleError(error);
  }
};
