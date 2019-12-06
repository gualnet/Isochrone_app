import React from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';

import EventTypePicker from '../../Components/EventTypePicker/EventTypePicker';
import EventSubTypePicker from '../../Components/EventSubTypePicker/EventSubTypePicker';
import APIEvent from '../../API/Events';

import styles from './TypesSelectionStyle';

const typeList = [
  {
    typeId: 0,
    type: 'XYZ',
    subType: ['A', 'B', 'C', 'D'],
  }, {
    typeId: 2,
    type: 'Bar',
    subType: ['WIN_BAR', 'BEER_BAR', 'CHILL', 'OLD_SCHOOL'],
  }, {
    typeId: 1,
    type: 'Restaurant',
    subType: ['INDIAN', 'SUSHI', 'BURGER', 'MIXICAN'],
  },
];

class TypesSelection extends React.Component {

  navigateToEventsManagement = () => {
    console.log('navigateToEventsManagement');
    this.props.navigation.navigate("Events");
  };

  createEvent = async () => {
    console.log('createEvent START');
    const { eventTypeId, eventSubTypeId, name, participantsList, date } = this.props;
    
    await APIEvent.createEvent({
      eventTypeId,
      eventSubTypeId,
      name,
      participantsList,
      date,
    });

    this.navigateToEventsManagement();
    console.log('createEvent END');
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View>
          <EventTypePicker typeList={typeList} />
          <EventSubTypePicker typeList={typeList} />
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
  };
};

export default connect(mapStateToProps)(TypesSelection);
