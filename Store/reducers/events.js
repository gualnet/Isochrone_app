
const initialState = {
  events: [],
  // eventTypes: {},
  // eventSubTypes: {},
};

const events = (state = initialState, action) => {

  let nextState = {
    events: [...state.events]
  };

  switch (action.type) {
    // update the local events list after reveiving it from the server
    case "UPDATE_EVENTS_LIST":
      nextState.events = action.payload;
      return nextState;

    default:
      return nextState;
  }
};

export default events;