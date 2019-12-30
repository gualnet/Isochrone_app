import React from 'react';
import { View } from 'react-native';
import ContactList from '../../Components/ContactList/ContactList';
import styles from './ContactSelectionStyle';

import { Button, Text } from '../../Components';

class ContactSelection extends React.Component {

  navigateToEventDateSelectionScreen = () => {
    this.props.navigation.navigate("DateSelection");
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.middleView}>
          <View style={styles.listContainer}>
            <ContactList></ContactList>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.btnContainer}>
            <Button gradient onPress={() => this.navigateToEventDateSelectionScreen()}>
              <Text primary gray center>Etape suivante ></Text>
            </Button>
          </View>
        </View>
      </View>
    );
  };
};

export default ContactSelection;
