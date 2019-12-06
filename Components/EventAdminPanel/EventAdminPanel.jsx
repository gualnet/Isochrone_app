import React from 'react';
import { Text, View } from 'react-native';

import styles from './style';


class EventAdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Event admin panel</Text>
        <Text>OPTION !</Text>
        <Text>OPTION !</Text>
        <Text>OPTION !</Text>
        <Text>OPTION !</Text>
        <Text>OPTION !</Text>
      </View>
    );
  };
};

export default EventAdminPanel;