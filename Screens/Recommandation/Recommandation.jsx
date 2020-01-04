import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';

import { Text, Button } from '../../Components';
import API from '../../API';
import config from '../../config/config';

class Recommandation extends React.Component {
  state = {
    data: null,
    selectedPoi: undefined,
    randomImageLink: undefined,
  };

  setRandomImage = async () => {
    // const imgLink = await API.Unsplash.getRandomPhoto('food');
    const imgLink = 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80';

    this.setState({
      ...this.state,
      randomImageLink: imgLink,
    });
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

  selectRecommandationMarker = async (selectedPOI) => {
    console.clear();
    console.log('POI', selectedPOI.place_id, selectedPOI.name);
    const response = await API.Events.getPlaceDetails(selectedPOI.place_id);
    // console.log('RESPONSE', response.data);
    await this.setRandomImage();
    this.setState({
      ...this.state,
      selectedPoi: response.data,
    });
    return;
  };

  buildRecommandationMarkers = () => {
    // console.log('buildRecommandationMarkers', this.state)
    if (!this.state.data) {
      console.log('Pas de data pour les recommandations');
      return
    }

    const markerArray = [];
    for (elem of this.state.data) {
      let poi = elem;
      markerArray.push(
        <Marker key={elem.id}
          coordinate={{
            latitude: Number(elem.geometry.location.lat),
            longitude: Number(elem.geometry.location.lng),
          }}
          title={elem.name}
          description={elem.vicinity}
          onPress={(e) => this.selectRecommandationMarker(poi)}
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

  handleValidation = () => {
    console.log('this.props', this.props)
    this.props.setSelectedMeetingPoint(this.state.selectedPoi);
  }
  
  render() {
    console.log('\nRENDER RECOMMANDATION')
    // console.log('...', this.props.navigation.state.params.event)
    // console.log('img', this.state.randomImageLink)
    const event = this.props.navigation.state.params.event;
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.topView}>
          {/* <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text> */}
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
          {
            !this.state.selectedPoi &&
            <Text>No POI Selected</Text>
          }
          {
            this.state.selectedPoi &&
            <View>
              <Image
                style={{width: 66, height: 58, borderColor: 'blue', borderWidth: 1}}
                source={{uri: this.state.randomImageLink}}
                />
              <Text>NAME {this.state.selectedPoi.name}</Text>
              <Text>Link {this.state.selectedPoi.html_attributions}</Text>
              <Text>Rate: {this.state.selectedPoi.rating}</Text>
            </View>
          }
        </View>
        <View style={styles.btnView}>
          <View style={styles.btnContainer}>
            <Button gradient onPress={() => this.handleValidation()} ><Text secondary white center>Valider</Text></Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default Recommandation;

const styles = StyleSheet.create({
  safeView:{
    flex: 1,
  },
  topView: {
    flex: 0,
  },
  mapView: {
    flex: 8,
  },
  mapStyle: {
    flex: 1,
  },
  bottomView: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  btnView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'black',
  },
  btnContainer: {
    width: '40%',
  },
});