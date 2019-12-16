import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

import config from '../../config/config';
import MyPermissions from '../../config/MyPermissions';

import styles from './style';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  askForPermissions = async () => {
    // ask the user for the permissions
    await MyPermissions.Location();
    // get the permissions status in the config object
    if (!config.Permissions.Location) {
      console.error('[ERROR] Location not authorized');
      return;
    };
    // Get the location status
    let location = await Location.getCurrentPositionAsync({});
    // console.log('location', location);

    this.props.dispatch({
      type: 'SET_LOCATION',
      payload: {
        country: null,
        city: null,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    });


    // ask the user for the permissions
    await MyPermissions.Contact();
    // get the permissions status in the config object
    if (!config.Permissions.Contacts) {
      console.error('[ERROR] Contact access not authorized');
      return;
    };

  };

  async componentDidMount() {
    await this.askForPermissions();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>FIND YOUR BAR</Text>
        <Text>COUCOU !</Text>
      </View>
    );
  };
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(HomeScreen);