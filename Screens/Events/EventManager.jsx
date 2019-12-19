import React from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import apiEvents from '../../API/Events';

import EventList from '../../Components/EventsList/EventsList';

import styles from './EventManagerStyle.js';

class EventsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EventsListLoading: false,
    };
  };

  navigateToEventCreationScreen = () => {
    this.props.navigation.navigate("EventCreation");
  };

  navigateToEventContactSelection = () => {
    const action = {
      type: "RESET_CREATION_DATA",
    };
    this.props.dispatch(action);

    this.props.navigation.navigate("ContactSelection");
  };

  fetchUsersEvents = async () => {
    try {
      const eventsList = await apiEvents.getAllUserEvents();
      const action = {
        type: 'UPDATE_EVENTS_LIST',
        payload: eventsList,
      }
      this.props.dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };

  displayLoading() {
    if (this.state.isLoading) {
      return (
        // <View style={style.viewLoading}>
          <ActivityIndicator size='large' color='#003AFF'/>
        // </View>
      )
    }
  };

  async componentDidMount() {
    // console.log('DID MOUNT EventManager')
    this.setState({
      ...this.state,
      EventsListLoading: true,
    });
    await this.fetchUsersEvents();
    this.setState({
      ...this.state,
      EventsListLoading: false,
    });
  }

  render() {
    // console.log('RENDER EventManager');
    return (
      <View style={styles.mainView}>
        <View style={styles.topView} >
          <View style={styles.btnContainer} >
            <Button title="New" onPress={() => this.navigateToEventContactSelection()}/>
          </View>
          <View style={styles.btnContainer} >
            <Button title="Update list" onPress={() => this.fetchUsersEvents()} />
          </View>
        </View>

        <View style={styles.middleView}>
          {!this.state.EventsListLoading && <EventList navigation={this.props.navigation}/>}
          {this.state.EventsListLoading && this.displayLoading()}
        </View>
      </View>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    events: state.events,
  };
};

export default connect(mapStateToProps)(EventsScreen);