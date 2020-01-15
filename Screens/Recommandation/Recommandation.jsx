import React from 'react';
import MapView from 'react-native-maps';
import { Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { StyleSheet, SafeAreaView, Image, TouchableHighlightComponent } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base';


import API from '../../API';
import { theme } from '../../libs';

class Recommandation extends React.Component {
  state = {
    cardIndex: 0,
    data: null,
    // selectedPoi: undefined,
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

  // selectRecommandationMarker = async (selectedPOI) => {
  //   console.clear();
  //   console.log('POI', selectedPOI.place_id, selectedPOI.name);
  //   const response = await API.Events.getPlaceDetails(selectedPOI.place_id);
  //   // console.log('RESPONSE', response.data);
  //   await this.setRandomImage();
  //   this.setState({
  //     ...this.state,
  //     // selectedPoi: response.data,
  //   });
  //   return;
  // };

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
          // onPress={(e) => this.selectRecommandationMarker(poi)}
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
    console.log('\nBUILD NEW CARD')
    console.log('itemData', itemData)
    // console.log('this.state.selectedPoi', this.state.selectedPoi);

    return (
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
    );
  };

  handleValidation = () => {
    this.props.navigation.state.params.setSelectedMeetingPoint(this.state.data[this.state.cardIndex]);
    this.props.navigation.navigate("EventDetails");
  };
  
  async componentDidMount() {
    console.log('COMPO DID MOUNT')
    await this.fetchRecommandations(this.props.navigation.state.params.event);
  }

  increaseCardIndex = () => {
    if (!this.state.data) return null;
    const maxIndex = this.state.data.length;
    let newIndex = 0;
    if (this.state.cardIndex < maxIndex) {
      newIndex = this.state.cardIndex + 1;
    }
    else if (this.state.cardIndex === maxIndex) {
      newIndex = 0;
    }
    this.setState({ cardIndex: newIndex });
  };
  decreaseCardIndex = () => {
    if (!this.state.data) return null;
    const maxIndex = this.state.data.length;
    let newIndex = 0;
    if (this.state.cardIndex > 0) {
      newIndex = this.state.cardIndex - 1;
    }
    else if (this.state.cardIndex === 0) {
      newIndex = maxIndex;
    }
    this.setState({ cardIndex: newIndex });
  };

  render() {
    console.log('\nRENDER RECOMMANDATION', this.state);
    const event = this.props.navigation.state.params.event;
    let latitude, longitude;
    const cardIndex = this.state.cardIndex;
    
    latitude = this.state.mapFocusLocation ? this.state.mapFocusLocation[0] : Number(event.participantsList[0].latitude);
    longitude = this.state.mapFocusLocation ? this.state.mapFocusLocation[1] : Number(event.participantsList[0].longitude);
    if (this.state.data) {
      latitude = this.state.data[cardIndex].geometry.location.lat;
      longitude = this.state.data[cardIndex].geometry.location.lng;
    }
    console.log('=====', latitude, longitude);
    return (
      <SafeAreaView style={styles.safeView}>
  <Text> {this.state.cardIndex}</Text>
        <MapView style={styles.mapStyle}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
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
                renderItem={(item) => this.buildCardForDeckSwiper(this.state.data[cardIndex])}
                onSwipeRight={ () => this.increaseCardIndex()}
                onSwipeLeft={ () => this.decreaseCardIndex()}
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