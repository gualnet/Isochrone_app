import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { Button, Text } from '../../Components';
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

  recommandationClick = () => {
    this.props.navigation.navigate("Recommandation", { event: this.state.event });
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
    const { event, myEventData } = this.state;
    // console.log('EVENT', event)
    // console.log('MYDATA', myEventData)
    return (
      <SafeAreaView style={styles.mainView}>
        <FadIn>
          {/* <View> */}
            {/* <View style={styles.topView}>
              <Text>EVENT DETAILS SCREEN</Text>
            </View> */}

            <View style={styles.middleView}>
              <View style={styles.mapView}>
                <MapLocation 
                  event={this.state.event}
                  myEventData={this.state.myEventData} />
              </View>
              <View style={styles.detailsView}>
                <Text>ID: {event.id}</Text>
                <Text>NAME: {event.name}</Text>
                <Text>DATE: {event.date}</Text>
                {/* <Text>MY POSITION: {event.date}</Text> */}
                <Text>PARTICIPANT: </Text>
                {this.buildParticipantList()}

              </View>
            </View>
            <View style={styles.recoBtnView}>
              <View style={styles.btnContainer}>
                <Button gradient onPress={() => this.recommandationClick()}><Text primary gray center>RECOMMANDATION</Text></Button>
              </View>
            </View>
            

            <View style={styles.bottomView}>
              <View style={styles.bottomBtnView}>
                <View style={styles.btnContainer}>
                  <Button gradient onPress={() => this.handleValidationClick()}><Text primary grZy center>Valider</Text></Button>
                </View>
                <View style={styles.btnContainer}>
                  <Button gradient onPress={() => this.handleReturnClick()} ><Text secondary white center>Retour</Text></Button>
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
