import React from 'react';
import { connect } from 'react-redux';
import { Picker } from 'react-native';

import style from './EventTypePickerStyle';

class EventTypePicker extends React.Component {

  buildTypePickerItems = () => {
    const typeList = this.props.typeList
    let arr = [];
    let i = 1;
    for (const elem of typeList) {
      arr.push(<Picker.Item key={i} label={elem.type} value={elem.typeId} />)
      i++;
    }
    return arr;
  };

  setChosenType = (value) => {
    const action = {
      type: 'SET_EVENT_TYPE',
      payload: value,
    };
    this.props.dispatch(action)
  };

  componentDidMount() {
    this.setChosenType(this.props.typeList[0].typeId);
  }

  render() {
    // Set the initial selected value
    let chosenType = this.props.chosenType ? this.props.chosenType : this.props.typeList[0].type;

    return(
      <Picker
        style={style.picker}
        key={0}
        selectedValue={chosenType}
        onValueChange={(itemValue) => this.setChosenType(itemValue)} >
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