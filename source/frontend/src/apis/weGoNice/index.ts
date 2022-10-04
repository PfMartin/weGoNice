import axios from 'axios';

const url = 'http://localhost:8000';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

interface UserCreateResponse {
  id: string;
  statusCode: number | null;
}

export const createUser = async (body: {
  email: string;
  password: string;
}): Promise<UserCreateResponse> => {
  try {
    const res = await axios.post(`${url}/users`, body, {
      headers,
    });

    return {
      id: res.data.id,
      statusCode: res.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 406) {
        return {
          id: `User with email ${body.email} already exists`,
          statusCode: error.response?.status || null,
        };
      }
      return {
        id: error.message,
        statusCode: error.response?.status || null,
      };
    }
    return {
      id: 'unexpected error',
      statusCode: null,
    };
  }
};
