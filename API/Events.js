import axios from 'axios';
import config from '../config/config';
import store from '../Store/configStore';

const API_URL = config.API_URL;

/**
 * Get all events related to the user
 */
const getAllUserEvents = async () => {
  try {
    const userToken = store.getState().userInfoReducer.token;
    // const response = await axios.get(`${API_URL}/events/${userToken}`);
    const response = await axios({
      url: `${API_URL}/events/${userToken}`,
      headers: {'Authorization': `Bearer ${userToken}`},
    });
    return response.data;
  } catch (error) {
    console.log(error)
    return [];
  }
};

/**
 * Get info of the (eventId) event
 */
const getEventById = async (eventId) => {
  try {
    const response = await axios.get(`${API_URL}/events/${eventId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
  // console.log(response);
  return response;
};

const createEvent = async (event) => {
  console.log('URL -->',`${API_URL}/events`)
  const response = await axios.post(`${API_URL}/events`, { event });
  // console.log(response);
  return response;
};

const updateEvent = async (eventId, event) => {
  const response = await axios.put(`${API_URL}/events/${eventId}`, { event });
  // console.log(response);
  return response;
};

const deleteEvent = async (eventId) => {
  const response = await axios.delete(`${API_URL}/events/${eventId}`);
  // console.log(response);
  return response;
};

const getEventTypes = async () => {
  const response = await axios.get(`${API_URL}/events/types`);
  // console.log(response);
  const list = {
    types: response.data.event_types,
    subTypes: response.data.event_sub_types,
  }
  return list;
};

export default {
  getAllUserEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventTypes,
};