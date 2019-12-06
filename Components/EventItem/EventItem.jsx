import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './style';

// import style from './style';

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
      <View style={styles.eventItem} >
        <TouchableOpacity
          onPress={() => this.navigateToEventDetails()} >
          <Text>EVENT ITEM</Text>
          <Text>ID {this.props.Event.id}</Text>
          <Text>Event: {this.props.Event.name}</Text>
          <Text>Date: {this.props.Event.date}</Text>
        </TouchableOpacity>
      </View>
    );
  };
};

export default EventItem;