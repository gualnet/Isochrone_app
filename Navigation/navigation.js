import React from 'react';
// import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { theme } from '../libs';

// SCREENS
import HomeScreen from '../Screens/Home/Home';
import EventsManagement from '../Screens/Events/EventManager';
import EventAdminPanel from '../Components/EventAdminPanel/EventAdminPanel';
import ContactSelection from '../Screens/Events/ContactSelection';
import DateSelection from '../Screens/Events/DateSelection';
import TypesSelection from '../Screens/Events/TypesSelection';
import PositionSelector from '../Screens/Events/PositioningSelector';
import EventDetails from '../Screens/EventDetails/EventDetails';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/SignUp/SignUp';
import Recommandation from '../Screens/Recommandation/Recommandation';


const HomeStackNavigator = createStackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      title: "Home",
    })
  },
  // Position: { 
  //   screen: PositionSelector,
  //   navigationOptions: ({navigation}) => ({
  //     title: "Position",
  //   })
  // },
});
const SignStackNavigator = createStackNavigator({
  Login: { 
    screen: Login,
    navigationOptions: ({navigation}) => ({
      // title: "Login",
    })
  },
  Signup: { 
    screen: Signup,
    navigationOptions: ({navigation}) => ({
      // title: "Signup",
    })
  },
});

const EventsStackNavigator = createStackNavigator({
  Events: { 
    screen: EventsManagement,
    navigationOptions: ({navigation}) => ({
      title: "MY EVENTS",
    }),
  },
  EventCreation: {
    screen: EventAdminPanel,
    navigationOptions: ({navigation}) => ({
      title: "EventCreation",
    }),
  },
  ContactSelection: {
    screen: ContactSelection,
    navigationOptions: ({navigation}) => ({
      title: "Contacts",
    }),
  },
  DateSelection: {
    screen: DateSelection,
    navigationOptions: ({navigation}) => ({
      title: "Date",
    }),
  },
  TypesSelection: { 
    screen: TypesSelection,
    navigationOptions: ({navigation}) => ({
      title: "Style",
    }),
  },
  EventDetails: {
    screen: EventDetails,
    navigationOptions: ({navigation}) => ({
      title: "EventDetails",
    }),
  },
  Recommandation: {
    screen: Recommandation,
    navigationOptions: ({navigation}) => ({
      title: "Recommandation",
    }),
  },
  
});

const MainTabNavigator = createBottomTabNavigator({
  Sign: {
    screen: SignStackNavigator,
    navigationOptions: () => ({
      // title: "Sign",
      // tabBarIcon: () => {
      //   return (
      //     // <Image
      //     //   source={require('../assets/search.png')}
      //     //   style={style.bottomMenuBarButton}
      //     // />
      //   );
      // }
    }),
  },
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: () => ({
      title: "home",
      // tabBarIcon: () => {
      //   return (
      //     // <Image
      //     //   source={require('../assets/search.png')}
      //     //   style={style.bottomMenuBarButton}
      //     // />
      //   );
      // }
    }),
  },
  Events: {
    screen: EventsStackNavigator,
    navigationOptions: () => ({
      title: "Events"
      // tabBarIcon: () => {
      //   return (
      //     <Image
      //       source={require('../assets/fav_off.png')}
      //       style={style.bottomMenuBarButton}
      //     />
      //   );
      // }
    }),
  },
  EventDetails:{
    screen: EventDetails,
    navigationOptions: () => ({
      title: "Event details"
    }),
  },

}, {
  tabBarOptions: {
    showLabel: true,
    // showIcon: true,
    // activeBackgroundColor: '#DDDDDD',
    activeBackgroundColor: theme.colors.mainBackground,
    inactiveBackgroundColor: '#F8F8F8',
  },
});

const Navigation = createAppContainer(MainTabNavigator);

export default Navigation;