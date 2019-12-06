import React from 'react';
// import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'

// SCREENS
import HomeScreen from '../Screens/Home/Home';
import EventsManagement from '../Screens/Events/EventManager';
import EventAdminPanel from '../Components/EventAdminPanel/EventAdminPanel';
import ContactSelection from '../Screens/Events/ContactSelection';
import DateSelection from '../Screens/Events/DateSelection';
import TypesSelection from '../Screens/Events/TypesSelection';
import PositionSelector from '../Screens/Events/PositioningSelector';
import EventDetails from '../Screens/EventDetails/EventDetails';


const HomeStackNavigator = createStackNavigator({
  Position: { 
    screen: PositionSelector,
    navigationOptions: ({navigation}) => ({
      title: "Position",
    })
  },
  Home: { 
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      title: "Home",
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
    })
  },
  
});

const MainTabNavigator = createBottomTabNavigator({
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
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#F8F8F8',
  },
});

const Navigation = createAppContainer(MainTabNavigator);

export default Navigation;