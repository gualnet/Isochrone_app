import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { Button, Text } from 'native-base';
import API from '../../API'
import FadIn from '../../Animations/FadIn';
import store from '../../Store/configStore';
import MapLocation from '../../Components/MapLocation/MapLocation';

import styles from './EventDetailsStyles';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.navigation.state.params.Event,
      myEventData: {},
      updates: {
        position: [],
      },
    };
  }

  navigateToEventStyleSelectionScreen = () => {
    this.props.navigation.navigate("Events");
  };

  handleValidationClick = async () => {
    if (this.state.updates.position.length > 0) {
      // send position to the server
      await API.Events.updateUserPostionForTheEvent(this.state.event.id, this.state.updates.position);
    }

    this.navigateToEventStyleSelectionScreen();
  };

  handleReturnClick = () => {
    this.navigateToEventStyleSelectionScreen();
  };

  recommandationClick = () => {
    this.props.navigation.navigate("Recommandation", { event: this.state.event });
  };

  chatRoomClick = () => {
    this.props.navigation.navigate("ChatRoom", { event: this.state.event});
  };

  buildParticipantList = () => {
    const participantsList = this.state.event.participantsList
    const arr = [];
    if (!participantsList) return;
    for (const item of participantsList) {
      arr.push(<Text key={item.id}> - {item.firstName} {item.lastName}</Text>);
    };
    return arr;
  };

  updateStateEventDetails = async ()  => {
    try {
      const response = await API.Events.getEventById(this.props.navigation.state.params.Event.id);
      let myEventData = {};
      if (response.status === 200) {
        for (elem of response.data.participantsList) {
          if (elem.id === store.getState().userInfoReducer.id) {
            myEventData = elem;
            break;
          }
        }
        this.setState({
          event: response.data,
          myEventData,
        });
      } else {
        this.props.navigation.navigate("Events");
        return;
      }
    } catch (error) {
      console.error
    }
  };

  setSelectedMeetingPoint = (point) => {
    // console.log('\n\nsetSelectedMeetingPoint', point);
    this.setState({
      ...this.state,
      event: {
        ...this.state.event,
        meetingPoint: point,
      },
    });
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

  UpdatedPosition = async (event) => {
    console.log(this.state.myEventData === this.state.event.participantsList[1])
    const newCoordinates = event.coordinate;
    this.setState({
      ...this.state,
      updates: {
        position: [event.coordinate.latitude, event.coordinate.longitude],
      }
    })
  };

  render() {
    // console.log('Render Event Details')
    // console.log('state event', this.state.event)
    const { event, myEventData } = this.state;
    return (
      <SafeAreaView style={styles.mainView}>
        <FadIn>
          <View style={styles.mapView}>
            <MapLocation 
              event={this.state.event}
              myEventData={this.state.myEventData}
              updateUserPosition={this.UpdatedPosition} />
          </View>
          <View style={styles.detailsView}>
            <Text>ID: {event.id}</Text>
            <Text>NAME: {event.name}</Text>
            <Text>DATE: {event.date}</Text>
            <Text>Meeting Point: {event.meetingPoint && event.meetingPoint.name}</Text>
            <Text>MY POSITION: [{this.state.myEventData.latitude} / {this.state.myEventData.longitude}]</Text>
            <Text>PARTICIPANT: </Text>
            {this.buildParticipantList()}
          </View>
          <View style={styles.bottomView}>
            <Button bordered onPress={() => this.recommandationClick()}><Text primary center>Recommandation</Text></Button>
            <Button bordered onPress={() => this.chatRoomClick()}><Text primary center>Chat</Text></Button>
            <Button bordered onPress={() => this.handleValidationClick()}><Text primary center>Valider</Text></Button>
            <Button bordered onPress={() => this.handleReturnClick()} ><Text secondary white center>Retour</Text></Button>
          </View>
        </FadIn>
      </SafeAreaView>
    );
  };
};

export default EventDetails;
