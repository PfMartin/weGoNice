import axios from 'axios';
import { useStore } from 'vuex';

interface RequestResponse {
  status: number | null;
  data: Record<string, any>;
}

const url = 'http://localhost:8000';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};

const handleError = (error: unknown): RequestResponse => {
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

export const registerUser = async (body: {
  email: string;
  password: string;
}): Promise<RequestResponse> => {
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
}): Promise<RequestResponse> => {
  try {
    const res = await axios.post(`${url}/auth/login`, body, {
      headers,
    });

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const refreshToken = async (): Promise<void> => {
  const store = useStore();
  const token = store.getters['auth/sessionToken'];
  headers.Authorization = `Bearer ${token}`;
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

    console.error(`An unexpected error occurred: %{error}`);
  }
};

export const getAllRecipes = async (): Promise<any> => {
  const token = useStore().getters['auth/sessionToken'];
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
