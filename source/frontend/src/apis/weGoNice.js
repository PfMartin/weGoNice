import axios from 'axios';

const PORT = 8000;
const url =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${PORT}`
    : `http://192.168.178.44:${PORT}`;

export default axios.create({
  baseURL: url,
});
