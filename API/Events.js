import axios from 'axios';
import config from '../config/config';
import store from '../Store/configStore';

import responseHandler from './handlers';

const API_URL = config.API_URL;
/**
 * Get all events related to the user
 */
const getAllUserEvents = async () => {
  try {
    const userToken = store.getState().userInfoReducer.token;
    const response = await axios({
      url: `${API_URL}/events`,
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
  return response;
};

const createEvent = async (event) => {
  try {
    const userToken = store.getState().userInfoReducer.token;
    const response = await axios({
      method: 'POST',
      url: `${API_URL}/events`,
      headers: {'Authorization': `Bearer ${userToken}`},
      data: { event },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateUserPostionForTheEvent = async (eventId, position) => {
  try {
    const userToken = store.getState().userInfoReducer.token;
    const response = await axios({
      method: 'POST',
      url: `${API_URL}/events/${eventId}/position`,
      headers: {'Authorization': `Bearer ${userToken}`},
      data: { position },
    });
    responseHandler(response);
    return response;
  } catch (error) {
    console.error(error);
  }
  return response;
};

const deleteEvent = async (eventId) => {
  try {
    // const response = await axios.delete(`${API_URL}/events/${eventId}`);
    console.log('NOT IMPLEMENTED');
    responseHandler(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getEventTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/events/types`);
    // console.log(response);
    const list = {
      types: response.data.event_types,
      subTypes: response.data.event_sub_types,
    }
    return list;
  } catch (error) {
    console.error(error);
  }
  
};

const getRecommandations = async (event) => {
  try {
    const userToken = store.getState().userInfoReducer.token;
    const response = await axios({
      method: 'POST',
      url: `${API_URL}/external/place/search`,
      headers: {'Authorization': `Bearer ${userToken}`},
      data: { event },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
  
};

/**
 * Take a google place id
 * return details related to the provided place id
 * @param {} placeId 
 */
const getPlaceDetails = async (placeId) => {
  try {
    const userToken = store.getState().userInfoReducer.token;
    const response = await axios({
      method: 'POST',
      url: `${API_URL}/external/place/details`,
      headers: {'Authorization': `Bearer ${userToken}`},
      data: { placeId },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAllUserEvents,
  getEventById,
  createEvent,
  deleteEvent,
  getEventTypes,
  getRecommandations,
  getPlaceDetails,
  updateUserPostionForTheEvent,
};