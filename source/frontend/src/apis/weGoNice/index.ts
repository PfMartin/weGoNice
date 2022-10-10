import axios from 'axios';
import { useStore } from 'vuex';

interface AuthResponse {
  status: number | null;
  data: Record<string, any>;
}

const url = 'http://localhost:8000';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};

export const registerUser = async (body: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  try {
    const res = await axios.post(`${url}/auth/register`, body, {
      headers,
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 406) {
        return {
          status: error.response.status,
          data: {
            msg: `User with email ${body.email} already exists`,
          },
        };
      }
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
  }
};

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  try {
    const res = await axios.post(`${url}/auth/login`, body, {
      headers,
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 406) {
        return {
          status: error.response?.status || null,
          data: {
            msg: error.message,
          },
        };
      }
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
  }
};

export const refreshToken = async (): Promise<void> => {
  const store = useStore();
  const token = store.getters.sessionToken;
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
