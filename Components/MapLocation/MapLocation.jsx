import React from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

import config from '../../config/config';
import { theme } from '../../libs';

class MapLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event,
    }
  }
  setLocation = async () => {
    if (!config.Permissions.Location) return;

    let location = await Location.getCurrentPositionAsync({});
    const action = {
      type: "SET_LOCATION",
      payload: {
        country: null,
        city: null,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    }
    this.props.dispatch(action);
  };

  buildParticipantMarkers = () => {
    // console.log('buildParticipantMarkers', this.state);
    const { participantsList } = this.state.event;
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
          description={`Position de ${participant.firstName}`}
        />
      );
    }
    return markerArray;
  };

  async componentDidMount() {
    if (this.props.locationPermissons){
      await this.setLocation();
    }
  };
  async componentDidUpdate(previousProps) {
    if (this.props.locationPermissons && previousProps.locationPermissons === false) {
      await this.setLocation();
    }
    if (this.props.event !== previousProps.event) {
      // console.log('\n\n FORCE UPDATE\n', this.props.event);
      this.setState({ event: this.props.event })
    }
  };

  render() {
    console.log('\n\nRENDER MAP LOCATION', this.state)
    const userLocation = this.props.userLocation;
    // console.log('userLocation', userLocation);
    return (
      userLocation.latitude && userLocation.longitude &&
      <MapView style={styles.mapStyle}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
      >
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title='moi'
          description='ma position'
        />
        {this.buildParticipantMarkers()}
      </MapView>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userlatitude: state.userInfoReducer.location.latitude,
    userLocation: state.userInfoReducer.location,
  };
};

export default connect(mapStateToProps)(MapLocation);


const styles = StyleSheet.create({
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});