import axios from 'axios';
import store from '@/store';

export const url = `http://${window.location.hostname}:8000`;
export const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};

export const fileHeaders = {
  'Content-Type': 'multipart/form-data',
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

export const addAuthorization = (token?: string) => {
  return token
    ? `Bearer ${token}`
    : `Bearer ${store.getters['auth/sessionToken']}`;
};
