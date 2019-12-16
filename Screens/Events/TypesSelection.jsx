import React from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';

import EventTypePicker from '../../Components/EventTypePicker/EventTypePicker';
import APIEvent from '../../API/Events';

import styles from './TypesSelectionStyle';

class TypesSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [],
    };
  }

  navigateToEventsManagement = () => {
    // console.log('navigateToEventsManagement');
    this.props.navigation.navigate("Events");
  };

  createEvent = async () => {
    try {
      console.log('PROPS', this.props);
      const { eventTypeId, eventSubTypeId, name, participantsList, date } = this.props;
      await APIEvent.createEvent({
        eventTypeId,
        eventSubTypeId,
        name,
        participantsList,
        date,
        longitude: this.props.userLocation.longitude,
        latitude: this.props.userLocation.latitude,
      });
  
      const eventsList = await APIEvent.getAllUserEvents();
      const action = {
        type: 'UPDATE_EVENTS_LIST',
        payload: eventsList,
      }
      this.props.dispatch(action);
  
      this.navigateToEventsManagement();
    } catch (error) {
      console.error(error);
    }
    
  };

  updateTypeList = async () => {
    const list = await APIEvent.getEventTypes();
    this.setState({
      ...this.state,
      typeList: list,
    });
  };

  async componentDidMount() {
    await this.updateTypeList();
  }

  setEventTypeId = (id) => {
    // set the type bar selected id
    this.props.dispatch({
      type: 'SET_EVENT_TYPE',
      payload: id,
    })
    // Here we reset the sub type bar selected id
    // to the first subType element correspong to the selected type
    for (const elem of this.state.typeList.subTypes) {
      if (elem.typeId === id) {
        this.props.dispatch({
          type: 'SET_EVENT_SUB_TYPE',
          payload: elem.id,
        })
        break;
      }
    }
  }

  setEventSubTypeId = (id) => {
    const action = {
      type: 'SET_EVENT_SUB_TYPE',
      payload: id,
    };
    this.props.dispatch(action)
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View>
          <EventTypePicker 
            types={this.state.typeList.types}
            setValue={this.setEventTypeId}
            currentValue={this.props.eventTypeId}
            />
          <EventTypePicker 
            types={this.state.typeList.subTypes}
            setValue={this.setEventSubTypeId}
            currentValue={this.props.eventSubTypeId} />
        </View>
        <View style={styles.bottomView}>
          <View style={styles.btnContainer}>
            <Button title="VALIDER" onPress={() => this.createEvent()}></Button>
          </View>
        </View>
      </View>
    );
  };
};


const mapStateToProps = (state) => {
  return {
    eventTypeId: state.eventCreationReducer.event_type_id,
    eventSubTypeId: state.eventCreationReducer.event_sub_type_id,
    name: state.eventCreationReducer.name,
    participantsList: state.eventCreationReducer.participantsList,
    date: state.eventCreationReducer.date,
    userLocation: state.userInfoReducer.location,
  };
};

export default connect(mapStateToProps)(TypesSelection);
