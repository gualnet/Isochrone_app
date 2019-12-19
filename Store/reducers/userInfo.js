
const initialState = {
  createdAt: null,
  email: null,
  firstName: null,
  id: null,
  lastName: null,
  localisation: null,
  location: {
    city: null,
    country: null,
    latitude: null,
    longitude: null,
  },
  phoneNumber: null,
  token: null,
};

const userInfo = (state = initialState, action) => {
  // console.log('USER INFO REDUCER', action)
  let nextState = { ...state };

  switch (action.type) {
    
    case "SET_LOGIN_DATA":
      nextState = {
        ...nextState,
        ...action.payload,
      };
      return nextState;
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