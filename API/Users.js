import axios from 'axios';
import config from '../config/config';

const API_URL = config.API_URL;

const login = async (data) => {
  const { email, password } = data;
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const register = async (data) => {
  const { login, email, phoneNumber, password } = data;
  try {
    return await axios.post(`${API_URL}/users/register`, {
      login,
      email,
      phoneNumber,
      password,
    });
  } catch (error) {
    console.error(error);
  }
};

const checkContactList = async (rawContactList) => {
  try {
    
    const response = await axios.post(`${API_URL}/users/contacts`, rawContactList);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  login,
  register,
  checkContactList,
};