import axios from 'axios';
const baseUrl = 'http://localhost:3001/api';

let token = null;
let userId = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const setUserId = (id) => {
  userId = id;
};

const getAll = async () => {
  const request = await axios.get(`${baseUrl}/users/${userId}`);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/v1/blog-list`, newBlog, config);
  return response.data;
};

export default { getAll, create, setToken, setUserId };
