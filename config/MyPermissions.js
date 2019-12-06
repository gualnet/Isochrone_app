import * as Permissions from 'expo-permissions';

import config from './config';

const MyPermissions = {

  Location: async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      config.Permissions.Location = true;
    } else {
      console.log('[ERROR] Permission to access location was denied');
    }
    return;
  },

  Contact: async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      config.Permissions.Contacts = true;
    } else {
      console.log('[ERROR] Permission to access contacts was denied');
    }
    return;
  },

};

export default MyPermissions;
