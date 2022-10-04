import axios from 'axios';

const url = 'http://localhost:8000';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const createUser = async (body: { email: string; password: string }) => {
  try {
    const { data } = await axios.post(`${url}/users`, body, {
      headers,
    });

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log('Axios error: ', err.message);
      return err;
    } else {
      console.log('Unexpected error: ', err);
      return 'An unexpected error occured';
    }
  }
};
