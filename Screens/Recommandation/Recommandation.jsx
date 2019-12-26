import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import MapView from 'react-native-maps';

import { Text } from '../../Components';
import API from '../../API';
import { theme } from '../../libs/';

class Recommandation extends React.Component {

  fetchRecommandations = async (event) => {
    try {
      const response = await API.Events.getRecommandations(event);
      console.log('RESPONSE', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  async componentDidMount() {
    await this.fetchRecommandations(this.props.navigation.state.params.event);
  }
  
  render() {
    console.log('...', this.props.navigation.state.params.event)
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
          ></MapView>
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