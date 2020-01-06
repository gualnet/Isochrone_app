import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { theme } from '../../libs'

class EventItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  navigateToEventDetails = () => {
    this.props.navigation.navigate("EventDetails", { Event: this.props.Event });
  }

  render() {
    // console.log('RENDER EVENT ITEM', this.props.Event)
    return (
      <View style={styles.viewShadow} >
        <TouchableOpacity style={styles.eventItem}
          onPress={() => this.navigateToEventDetails()} >
          {/* <Text>EVENT ITEM</Text> */}
          <Text>ID {this.props.Event.id}</Text>
          <Text>Event: {this.props.Event.name}</Text>
          <Text>Date: {this.props.Event.date}</Text>
        </TouchableOpacity>
      </View>
    );
  };
};

export default EventItem;

const styles = StyleSheet.create({
  eventItem: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,

    // Shadow effect for ios
    backgroundColor: theme.colors.mainBackground,
    borderRadius: theme.sizes.inputBorderRadius,
    borderWidth: theme.sizes.inputBorderWidth,
    shadowColor: theme.colors.shadowColorTop,
    shadowOffset: { width: 8, height: 8 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    // shadow effect for android
    elevation: 2,
  },
  viewShadow: {
    // special shadow effect for ios
    borderRadius: theme.sizes.inputBorderRadius,
    shadowColor: theme.colors.shadowColorDown,
    shadowOffset: { width: -8, height: -8 },
    shadowRadius: 8,
    shadowOpacity: 1,
    marginTop: 5,
    marginBottom: 5,
  },
});