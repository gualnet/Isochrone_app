import React from 'react';
import { connect } from 'react-redux';
import { Picker } from 'react-native';

import style from './EventSubTypePickerStyle';

class EventSubTypePicker extends React.Component {

  buildSubTypePickerItems = () => {
    const typeList = this.props.typeList
    let arr = [];
    let i = 0;
    for (const elem of typeList) {
      if (this.props.chosenType === elem.typeId) {
        for (const subElem of elem.subType) {
          arr.push(<Picker.Item key={i} label={subElem} value={i} />)
          i++;
        }
      }
    }
    return arr;
  };

  setChosenSubType = (value) => {
    const action = {
      type: 'SET_EVENT_SUB_TYPE',
      payload: value,
    };
    this.props.dispatch(action)
  };

  render() {
    console.log('RENDER EventSubTypePicker')
    // Set the initial selected value
    let chosenSubType = this.props.chosenSubType ? this.props.chosenSubType : 'NULL';
    return(
      <Picker
        style={style.picker}
        selectedValue={chosenSubType}
        onValueChange={(itemValue) => this.setChosenSubType(itemValue)}>
        {this.buildSubTypePickerItems()}
      </Picker>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    chosenType: state.eventCreationReducer.event_type_id,
    chosenSubType: state.eventCreationReducer.event_sub_type_id,
  };
};

export default connect(mapStateToProps)(EventSubTypePicker);