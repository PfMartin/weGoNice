import axios from 'axios';

export const url = 'http://localhost:8000';
export const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};

export const handleError = (error: unknown): WeGoNiceApi.RequestResponse => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status || null,
      data: {
        msg: error.message,
      },
    };
  }
  return {
    status: null,
    data: {
      msg: 'unexpected error',
    },
  };
};
