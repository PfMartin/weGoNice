import axios from 'axios';

const url = 'http://localhost:8000';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

interface AuthResponse {
  id: string;
  statusCode: number | null;
  sessionToken: string | null;
}

export const registerUser = async (body: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  try {
    const res = await axios.post(`${url}/auth/register`, body, {
      headers,
    });

    return {
      id: res.data.id,
      statusCode: res.status,
      sessionToken: res.data.sessionToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 406) {
        return {
          id: `User with email ${body.email} already exists`,
          statusCode: error.response?.status || null,
          sessionToken: null,
        };
      }
      return {
        id: error.message,
        statusCode: error.response?.status || null,
        sessionToken: null,
      };
    }
    return {
      id: 'unexpected error',
      statusCode: null,
      sessionToken: null,
    };
  }
};

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  console.log(body);
  try {
    const res = await axios.post(`${url}/auth/login`, body, {
      headers,
    });

    return {
      id: res.data.id,
      statusCode: res.status,
      sessionToken: res.data.sessionToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 406) {
        return {
          id: `USER ID`,
          statusCode: error.response?.status || null,
          sessionToken: null,
        };
      }
      return {
        id: error.message,
        statusCode: error.response?.status || null,
        sessionToken: null,
      };
    }
    return {
      id: 'unexpected error',
      statusCode: null,
      sessionToken: null,
    };
  }
};
