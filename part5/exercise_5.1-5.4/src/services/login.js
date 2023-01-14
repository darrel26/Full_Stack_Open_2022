import axios from 'axios';
const baseUrl = 'http://localhost:3001/api';

const login = async (credentials) => {
  const request = await axios.post(`${baseUrl}/login`, credentials);
  return request.data;
};

export default { login };
