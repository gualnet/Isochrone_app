import axios from 'axios';
import config from '../config/config';

const API_URL = config.API_URL;

const login = async (data) => {
  const { email, password } = data;
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });

    // console.log('\nresponse', response.status);
    // console.log('\nresponse', response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default {
  login,
};