import React from 'react';
import { View, Button } from 'react-native';
import ContactList from '../../Components/ContactList/ContactList';
import styles from './ContactSelectionStyle';

class ContactSelection extends React.Component {

  navigateToEventDateSelectionScreen = () => {
    this.props.navigation.navigate("DateSelection");
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.middleView}>
          <ContactList></ContactList>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.btnContainer}>
            <Button title="Etape suivante >" onPress={() => this.navigateToEventDateSelectionScreen()}/>
          </View>
        </View>
      </View>
    );
  };
};

export default ContactSelection;
