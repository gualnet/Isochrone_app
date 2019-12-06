import React from 'react';
import { Button, Text, SafeAreaView, View } from 'react-native';

import MapLocation from '../../Components/MapLocation/MapLocation';
import FadIn from '../../Animations/FadIn';

import styles from './EventDetailsStyles';

class EventDetails extends React.Component {

  navigateToEventStyleSelectionScreen = () => {
    this.props.navigation.navigate("Events");
  };

  handleValidationClick = () => {
    this.navigateToEventStyleSelectionScreen();
  };

  handleReturnClick = () => {
    this.navigateToEventStyleSelectionScreen();
  };

  buildParticipantList = (list) => {
    if (!list) return [];
    const arr = [];
    for (const item of list) {
      arr.push(<Text key={item.id}>{item.name}</Text>);
    };
    return arr;
  };

  render() {
    // console.log('state-->', this.props.navigation.state.params)
    const event = this.props.navigation.state.params.Event;
    console.log('EVENT', event)
    const arrParticipant = this.buildParticipantList(event.participantsList);
    return (
      <SafeAreaView style={styles.mainView}>
        <FadIn>
          {/* <View> */}
            <View style={styles.topView}>
              <Text>EVENT DETAILS SCREEN</Text>
            </View>

            <View style={styles.middleView}>
              <View style={styles.mapView}>
                <MapLocation />
              </View>
              <View style={styles.detailsView}>
                <Text>NAME: {event.name}</Text>
                <Text>DATE: {event.date}</Text>
                <Text>PARTICIPANT: </Text>
                {arrParticipant}
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
