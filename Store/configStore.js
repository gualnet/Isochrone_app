import { createStore, combineReducers } from 'redux';
import eventsReducer from './reducers/events';
import eventCreationReducer from './reducers/eventCreation';
import userInfoReducer from './reducers/userInfo';

const mainReducers = combineReducers({
  eventsReducer,
  eventCreationReducer,
  userInfoReducer,
});

const store = createStore(mainReducers);

export default store;

