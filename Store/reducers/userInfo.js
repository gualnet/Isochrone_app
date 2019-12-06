
const initialState = {
  id: null,
  name: null,
  location: {
    country: null,
    city: null,
    longitude: null,
    latitude: null,
  },
};

const userInfo = (state = initialState, action) => {
  // console.log('USER INFO REDUCER', action)
  let nextState = { ...state };

  switch (action.type) {
    
    /**
     * Set the location
     * Payload = { country, city, longitude, latitude }
     */
    case "SET_LOCATION":
      nextState.location = action.payload;
      // console.log('\n\nnextState', nextState)
      return nextState;

    default:
      return nextState;
  }
};

export default userInfo;