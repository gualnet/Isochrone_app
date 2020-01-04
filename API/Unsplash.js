import axios from 'axios';
import config from '../config/config';

const UN = config.unsplash;

const getRandomPhoto = async (queryString) => {
  console.clear();
  try {
    console.log('UNSPLASH URL: ', `${UN.API_URL}/photos/random?client_id=${UN.API_KEY}&query=${queryString}`);
    const response = await axios({
      method: "GET",
      url: `${UN.API_URL}/photos/random?client_id=${UN.API_KEY}&query=${queryString}`,
    });
    return response.data.urls.small;
  } catch (error) {
    console.error(error);
  }
  
};

export default {
  getRandomPhoto,
};