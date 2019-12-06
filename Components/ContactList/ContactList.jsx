import React from 'react';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { Text, View, FlatList, TouchableOpacity, Switch } from 'react-native';

import config from '../../config/config';
import style from './style';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: [],
    };
  };

  loadContacts = async () => {
    if (!config.Permissions.Location) return;

    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers
      ],
    });
    this.setState({
      ...this.state,
      contact: data,
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
    return (
      <View style={style.contactItem}>
        <TouchableOpacity onPress={this.addToContactSelection}>
          <Text>{item.name}</Text>
          {
            item.phoneNumbers && item.phoneNumbers[0] && <Text>{item.phoneNumbers[0].number}</Text>
          }
          {
            (!item || !item.phoneNumbers || !item.phoneNumbers[0]) && <Text>Pas de numero</Text>
          }
          <Switch
            value={isSelect}
            onValueChange={(e) => this.addToContactSelection(e, item)}
            ></Switch>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    this.loadContacts();
  };

  render() {
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
