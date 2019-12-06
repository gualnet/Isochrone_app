import React from 'react';
import { connect } from 'react-redux';
import { DatePickerIOS } from 'react-native';

class IOSDatePIcker extends React.Component {

  setChosenDate = (newDate) => {
    const action = {
      type: 'SET_DATE',
      payload: newDate,
    };
    this.props.dispatch(action);
  }

  render() {
    return (
      <DatePickerIOS
        date={this.props.choosenDate}
        onDateChange={(e) => this.setChosenDate(e)}
      />
    );
  };
};

const mapStateToProps = (state) => {
  return {
    choosenDate: state.eventCreationReducer.date,
  };
};

export default connect(mapStateToProps)(IOSDatePIcker);