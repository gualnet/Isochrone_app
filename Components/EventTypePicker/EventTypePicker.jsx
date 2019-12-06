import React from 'react';
import { connect } from 'react-redux';
import { Picker, View, ActivityIndicator } from 'react-native';

import style from './EventTypePickerStyle';

class EventTypePicker extends React.Component {

  buildTypePickerItems = () => {
    const types = this.props.types;
    let arr = [];
    for (const elem of types) {
      if (elem.typeId && elem.typeId === this.props.chosenType) {
        // build the subTypes items
        arr.push(<Picker.Item key={elem.id} label={elem.name} value={elem.id} />)
      } else if (!elem.typeId) {
        // build the Types items
        arr.push(<Picker.Item key={elem.id} label={elem.name} value={elem.id} />)
      }
    }
    return arr;
  };

  

  render() {
    if (!this.props.types) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return(
      <Picker
        style={style.picker}
        selectedValue={this.props.currentValue}
        onValueChange={(itemValue) => this.props.setValue(itemValue)} >
        { this.buildTypePickerItems() }
      </Picker>
    );
  };
};

const mapStateToProps = (state) => {
  return ({
    chosenType: state.eventCreationReducer.event_type_id,
  });
};

export default connect(mapStateToProps)(EventTypePicker);