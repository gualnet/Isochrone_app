import React from 'react';
import { View, Text } from 'react-native';

import config from '../../config/config';
import MyPermissions from '../../config/MyPermissions';
import MapLocation from '../../Components/MapLocation/MapLocation';
import styles from './PositioningSelectorStyle';

class PositionSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationPermissons: false,
    };
  }

  askForPermissions = async () => {
    // ask the user for the permissions
    await MyPermissions.Location();
    
    // get the permissions status in the config object
    if (!config.Permissions.Location) {
      console.error('[ERROR] Location not authorized');
      return;
    };
    this.setState({
      ...this.state,
      locationPermissons: true,
    });
  };

  async componentDidMount() {
    await this.askForPermissions();
  }

  render() {
    return (
      <View style={styles.mainView}>
        <MapLocation locationPermissons={this.state.locationPermissons}/>
      </View>
    );
  };
};

export default PositionSelector;
