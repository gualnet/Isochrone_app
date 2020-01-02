import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import { Text } from '../../Components';
import API from '../../API';

class Recommandation extends React.Component {
  state = {
    data: null,
  };

  fetchRecommandations = async (event) => {
    try {
      const response = await API.Events.getRecommandations(event);
      // console.log('RESPONSE', response.data);
      this.setState({ data: response.data.results });
    } catch (error) {
      console.error(error);
    }
  };

  async componentDidMount() {
    await this.fetchRecommandations(this.props.navigation.state.params.event);
  }

  buildRecommandationMarkers = () => {
    // console.log('buildRecommandationMarkers', this.state)
    if (!this.state.data) {
      console.log('Pas de data pour les recommandations');
      return
    }

    const markerArray = [];
    for (elem of this.state.data) {
      markerArray.push(
        <Marker key={elem.id}
          coordinate={{
            latitude: Number(elem.geometry.location.lat),
            longitude: Number(elem.geometry.location.lng),
          }}
          title={elem.name}
          description={elem.vicinity}
        />
      );
    }
    return markerArray;
  };
  buildParticipantMarkers = () => {
    const { participantsList } = this.props.navigation.state.params.event;
    if (!participantsList) return [];
    const markerArray = [];
    for (participant of participantsList) {
        markerArray.push(
          <Marker key={participant.id}
            coordinate={{
              latitude: Number(participant.latitude),
              longitude: Number(participant.longitude),
            }}
            title={participant.firstName}
            description='Ma postion'
            pinColor='blue'
          />
        );
      }
    return markerArray;
  };
  
  render() {
    // console.log('...', this.props.navigation.state.params.event)
    const event = this.props.navigation.state.params.event;
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.topView}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
        <View style={styles.mapView}>
          <MapView style={styles.mapStyle}
            initialRegion={{
              latitude: Number(event.participantsList[0].latitude),
              longitude: Number(event.participantsList[0].longitude),
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {this.buildRecommandationMarkers()}
            {this.buildParticipantMarkers()}
          </MapView>
        </View>
        <View style={styles.bottomView}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default Recommandation;

const styles = StyleSheet.create({
  safeView:{
    flex: 1,
    // backgroundColor: 'green',
  },
  topView: {
    height: '10%',
    width: '100%',
    // backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  mapView: {
    height: '80%',
    width: '100%',
  },
  mapStyle: {
    height: '100%',
    width: '100%',
  },
  bottomView: {
    height: '10%',
    width: '100%',
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});