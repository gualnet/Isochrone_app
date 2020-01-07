import React from 'react';
import MapView from 'react-native-maps';
import { Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { StyleSheet, SafeAreaView, Image, TouchableHighlightComponent } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base';


import API from '../../API';
import { theme } from '../../libs';

class Recommandation extends React.Component {
  state = {
    data: null,
    selectedPoi: undefined,
    randomImageLink: undefined,
    mapFocusLocation: undefined, // [lat, long]
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

  buildCardForDeckSwiper = (itemData) => {
    return (
      // <Card>
        <CardItem cardBody style={styles.DeckSwiperCard}>
          <Image
            style={{width: 66, height: 58, borderColor: 'blue', borderWidth: 1}}
            source={{uri: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'}}
            // source={{uri: this.state.randomImageLink}}
            />
          <Text>NAME {itemData.name}</Text>
          <Text>Link {itemData.html_attributions}</Text>
          <Text>Rate: {itemData.rating}</Text>
        </CardItem>
      // </Card>
    );
  };

  handleValidation = () => {
    console.log('this.props', this.props)
    this.props.setSelectedMeetingPoint(this.state.selectedPoi);
  };

  handleSwipeRight = (itemData) => {
    this.setState({
      ...this.state,
      mapFocusLocation: [
        itemData.geometry.location.lat,
        itemData.geometry.location.lng,
      ]
    })
  };
  
  async componentDidMount() {
    await this.fetchRecommandations(this.props.navigation.state.params.event);
  }

  render() {
    console.log('\nRENDER RECOMMANDATION', this.state.mapFocusLocation);
    const event = this.props.navigation.state.params.event;
    const latitude = this.state.mapFocusLocation ? this.state.mapFocusLocation[0] : Number(event.participantsList[0].latitude);
    const longitude = this.state.mapFocusLocation ? this.state.mapFocusLocation[1] : Number(event.participantsList[0].longitude);
    return (
      <SafeAreaView style={styles.safeView}>
        <MapView style={styles.mapStyle}
          // initialRegion={{
          //   latitude: Number(event.participantsList[0].latitude),
          //   longitude: Number(event.participantsList[0].longitude),
          //   latitudeDelta: 0.1,
          //   longitudeDelta: 0.1,
          // }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
        {this.buildRecommandationMarkers()}
        {this.buildParticipantMarkers()}
        </MapView>
        <View style={styles.middleView}>
          {
            this.state.data &&
            <View style={styles.DeckContainer}>
              <DeckSwiper
                style={styles.DeckSwiper}
                dataSource={this.state.data}
                renderItem={(item) => this.buildCardForDeckSwiper(item)}
                onSwipeRight={(item) => this.handleSwipeRight(item)}
                >
              </DeckSwiper>
            </View>
          }
        </View>
        <View style={styles.btnView}>
          <Button bordered onPress={() => this.handleValidation()} ><Text>Valider</Text></Button>
        </View>
      </SafeAreaView>
    );
  }
};

export default Recommandation;

const styles = StyleSheet.create({
  safeView:{
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  topView: {
    flex: 0,
  },
  mapStyle: {
    flex: 5,
  },
  middleView: {
    flex: 3,
  },
  btnView: {
    flex: 1,
    maxHeight: theme.sizes.uikit.buttonHeight,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  DeckContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    padding: 10,
  },
  DeckSwiper: {
    flex: 1,
  },
  DeckSwiperCard: {
    // flex: 1,
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: theme.sizes.inputBorderRadius,
    borderColor: theme.colors.gray,
  }
});