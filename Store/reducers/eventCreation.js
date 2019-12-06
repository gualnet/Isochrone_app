
const initialState = {
  name: 'name',
  participantsList: [],
  date: new Date(),
  event_type_id: undefined,
  event_sub_type_id: undefined,
};

const eventCreation = (state = initialState, action) => {
  let nextState = {
    ...state,
  };

  switch (action.type) {

    case "RESET_CREATION_DATA":
      return initialState;

    case "TOOGLE_PARTICIPANT":
      let newList = [];
      let found = false;
      for (const elem of nextState.participantsList) {
        if (action.payload.id !== elem.id) {
          newList.push(elem);
        } else {
          found = true;
        }
      }

      if (!found) {
        newList.push(action.payload);
      }
      nextState.participantsList = newList;
      return nextState;

      case "SET_DATE":
        nextState.date = action.payload;
        return nextState;
      
      case "SET_EVENT_TYPE":
        nextState.event_type_id = action.payload;
        return nextState;

      case "SET_EVENT_SUB_TYPE":
        nextState.event_sub_type_id = action.payload;
        return nextState;


      // case "":
      //   return nextState

    default:
      return nextState;
  };


};

export default eventCreation;