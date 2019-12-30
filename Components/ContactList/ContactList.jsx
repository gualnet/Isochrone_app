import React from 'react';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
// import * as Permissions from 'expo-permissions';
import { Text, View, FlatList, TouchableOpacity, Switch } from 'react-native';

import API from '../../API';
import config from '../../config/config';
import style from './style';
import styles from './style';


class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredContact: [],
      contact: [],
    };
  };

  loadContacts = async () => {
    if (!config.Permissions.Contacts) return;

    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers
      ],
    });

    // sendContactsToApi
    const response = await API.Users.checkContactList(data);
    const identifiedContactsList = response.data;


    this.setState({
      ...this.state,
      contact: [
        ...identifiedContactsList,
        ...data
      ],
    })

  };

  addToContactSelection = (e, contact) => {
    const action = {
      type: "TOOGLE_PARTICIPANT",
      payload: contact,
    };
    this.props.dispatch(action);
  };

  isSelected = (contact) => {
    const list = this.props.participantsList;
    if (!list) return false;
    for (const participant of list) {
      if (participant.id === contact.id) {
        return true;
      }
    }
    return false;
  }

  renderItem = ({ item }) => {
    const isSelect = this.isSelected(item);
    if (item.createdAt) {
      return (
        <View style={style.contactItem}>
          <TouchableOpacity style={styles.touchableStyle}>
            <View style={style.contactInfoView}>
              <Text>{item.firstName} {item.lastName}</Text>
              {
                item.phoneNumbers && item.phoneNumbers[0] && <Text>{item.phoneNumbers[0].number}</Text>
              }
              {
                // Si pas de numero dans item.phoneNumbers -> display item.phoneNumber
                (!item || !item.phoneNumbers || !item.phoneNumbers[0]) && item.phoneNumber 
                && <Text>{item.phoneNumber}</Text>
              }
            </View>
            <View style={style.contactSwitchView}>
              <Switch
                value={isSelect}
                onValueChange={(e) => this.addToContactSelection(e, item)}
                ></Switch>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={style.contactItem}>
          <TouchableOpacity style={styles.touchableStyle}>
            <View style={style.contactInfoView}>
              <Text>{item.firstName} {item.lastName}</Text>
              {
                item.phoneNumbers && item.phoneNumbers[0] && <Text>{item.phoneNumbers[0].number}</Text>
              }
              {
                // Si pas de numero dans item.phoneNumbers -> display item.phoneNumber
                (!item || !item.phoneNumbers || !item.phoneNumbers[0]) && item.phoneNumber 
                && <Text>{item.phoneNumber}</Text>
              }
            </View>
            <View style={style.contactSwitchView}>
              <Switch
                disabled
                value={isSelect}
                onValueChange={(e) => {}}// do nothing
                ></Switch>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  async componentDidMount() {
    await this.loadContacts();
  };

  render() {
    // console.log('\n Render Contact List');
    return (
      <View>
        <FlatList
          data={this.state.contact}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ListEmptyComponent={() => <Text>No contacts found</Text>} />
      </View>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    participantsList: state.eventCreationReducer.participantsList,
  };
};

export default connect(mapStateToProps)(ContactList);
