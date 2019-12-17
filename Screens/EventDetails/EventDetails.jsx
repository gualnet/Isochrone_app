import React from 'react';
import { Button, Text, SafeAreaView, View } from 'react-native';

import API from '../../API'
import MapLocation from '../../Components/MapLocation/MapLocation';
import FadIn from '../../Animations/FadIn';

import styles from './EventDetailsStyles';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.navigation.state.params.Event,
    }
  }

  navigateToEventStyleSelectionScreen = () => {
    this.props.navigation.navigate("Events");
  };

  handleValidationClick = () => {
    this.navigateToEventStyleSelectionScreen();
  };

  handleReturnClick = () => {
    this.navigateToEventStyleSelectionScreen();
  };

  buildParticipantList = () => {
    const participantsList = this.state.event.participantsList
    const arr = [];
    if (!participantsList) return;
    for (const item of participantsList) {
      arr.push(<Text key={item.id}>{item.firstName} {item.lastName}</Text>);
    };
    return arr;
  };

  updateStateEventDetails = async ()  => {
    try {
      const response = await API.Events.getEventById(this.props.navigation.state.params.Event.id);
      // console.log('\ngetEventById status:', response.status);
      if (response.status === 200) {
        // console.log('RESPONSE data', response.data);
        this.setState({ event: response.data });
      } else {
        // console.error('getEventById status:', response.status);
        this.props.navigation.navigate("Events");
        return;
      }
    } catch (error) {
      console.error
    }
  };

  async componentDidMount() {
    await this.updateStateEventDetails();
  }

  async componentDidUpdate(previousProps) {
    // console.log('this.props', this.props);
    if (previousProps.navigation.state.params.Event.id !== this.props.navigation.state.params.Event.id) {
      await this.updateStateEventDetails();
    }
  }

  render() {
    const { event } = this.state;
    return (
      <SafeAreaView style={styles.mainView}>
        <FadIn>
          {/* <View> */}
            {/* <View style={styles.topView}>
              <Text>EVENT DETAILS SCREEN</Text>
            </View> */}

            <View style={styles.middleView}>
              <View style={styles.mapView}>
                <MapLocation event={this.state.event}/>
              </View>
              <View style={styles.detailsView}>
                <Text>ID: {event.id}</Text>
                <Text>NAME: {event.name}</Text>
                <Text>DATE: {event.date}</Text>
                <Text>PARTICIPANT: </Text>
                {this.buildParticipantList()}
              </View>
            </View>

            <View style={styles.bottomView}>
              <View style={styles.bottomBtnView}>
                <View style={styles.btnContainer}>
                  <Button title='Valider' onPress={() => this.handleValidationClick()}></Button>
                </View>
                <View style={styles.btnContainer}>
                  <Button title='Retour' onPress={() => this.handleReturnClick()} ></Button>
                </View>
              </View>
            </View>
          {/* </View> */}
        </FadIn>
      </SafeAreaView>
    );
  };

};

export default EventDetails;
