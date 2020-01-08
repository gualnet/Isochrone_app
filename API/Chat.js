import axios from 'axios';
import config from '../config/config';
import store from '../Store/configStore';

const API_URL = config.API_URL;

const addMessage = async (eventId, payload) => {
  console.log('addMessage', payload);
  try {
    const userToken = store.getState().userInfoReducer.token;

    const response = await axios({
      method: 'POST',
      url: `${API_URL}/chats/${eventId}/message`,
      headers: {'Authorization': `Bearer ${userToken}`},
      data: payload,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};


export default {
  addMessage,
};