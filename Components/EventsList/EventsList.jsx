import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, FlatList, Text } from 'react-native';
import EventItem from '../EventItem/EventItem';
import styles from './style';

class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      this.props.events.length !== 0 &&
      <SafeAreaView style={styles.toptop}>
        <FlatList
            data={this.props.events}
            keyExtractor={item => item.id.toString()}
            renderItem={ ({item}) => (
              <EventItem 
              Event={item}
              navigation={this.props.navigation} />
            )}
          >
        </FlatList>
      </SafeAreaView>
      ||
      <Text>NOTHING TO DISPLAY</Text>
    );
  };
};


const mapStateToProps = (state) => {
  return {
    events: state.eventsReducer.events,
  };
};

export default connect(mapStateToProps)(EventsList);
