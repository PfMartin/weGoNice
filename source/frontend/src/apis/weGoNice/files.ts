import {
  url,
  handleError,
  headers,
  addAuthorization,
} from '@/apis/weGoNice/utils';
import axios from 'axios';
import Pako, { inflate } from 'pako';

export const uploadFile = async (
  id: string | string[],
  file: File
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

export const uploadFileTmp = async (
  file: File
): Promise<WeGoNiceApi.RequestResponse> => {
  const formData = new FormData();
  formData.append('picture', file);

  try {
    const res = await axios.post(`${url}/files_tmp`, formData, {
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

export const getImage = async (
  filename: string
): Promise<string | WeGoNiceApi.RequestResponse> => {
  try {
    const res = await axios.get(`${url}/files/${filename}`, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: addAuthorization(),
      },
    });

    return createImageUrl(res.data);
  } catch (error) {
    return handleError(error);
  }
};

export const getImageTmp = async (
  filename: string
): Promise<string | WeGoNiceApi.RequestResponse> => {
  try {
    const res = await axios.get(`${url}/files_tmp/${filename}`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'image',
        Authorization: addAuthorization(),
      },
    });

    return createImageUrl(res.data);
  } catch (error) {
    return handleError(error);
  }
};

export const removeImageTmp = async (filename: string) => {
  headers.Authorization = addAuthorization();

  try {
    const res = await axios.delete(`${url}/files_tmp/${filename}`, {
      headers,
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};

const createImageUrl = (compressedData: Pako.Data): string => {
  const decompressedImage = inflate(compressedData);

  const blob = new Blob([decompressedImage], { type: 'image/png' });
  const imageObjectURL = URL.createObjectURL(blob);

  return imageObjectURL;
};
