import React from 'react';
import { View, Text, Button, Platform } from 'react-native';

import IOSDatePicker from '../../Components/DatePicker/IOSDatePIcker';
import styles from './DateSelectionStyle';

class DateSelection extends React.Component {

  navigateToEventStyleSelectionScreen = () => {
    this.props.navigation.navigate("TypesSelection");
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.btnView}>
          <View style={styles.btnContainer}>
            <Button title='Vote' disabled={true} />
          </View>
          <View style={styles.btnContainer}>
            <Button title='Impose' />
          </View>
          <View style={styles.btnContainer}>
            <Button title='Doodle' disabled={true} />
          </View>
        </View>
        <View style={styles.datePickerView}>
          {
            Platform.OS === 'ios' && <IOSDatePicker />
            ||
            Platform.OS === 'android' && <Text> DATE PICKER FOR ANDROID</Text>
          }
        </View>

        <View style={styles.bottomView}>
          <Button title="Etape suivante >" onPress={() => this.navigateToEventStyleSelectionScreen()} />
        </View>
      </View>
    )
  };
};

export default DateSelection;
