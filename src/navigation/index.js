import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import NavBar from '../components/NavBar';

import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome';
import Home from '../screens/Home';

import * as Colors from '../values/colors';

const headerNavigationOptions = ({ navigation }) => {
  return {
    headerTitle: <NavBar navigation={navigation} />,
    headerTintColor: Colors.primaryColor,
    headerStyle: {
      backgroundColor: Colors.primaryColor,
      borderBottomWidth: 0,
      elevation: 0,
    },
    // headerTitleStyle: {
    //   color: '#FFF',
    // },
    headerBackTitle: null,
  };
};

// export default createAppContainer(
//   createStackNavigator(
//     {
//       Splash,
//       Welcome,
//       Home,
//     },
//     {
//       defaultNavigationOptions: headerNavigationOptions,
//     },
//   ),
// );

const HomeStack = createStackNavigator(
  { Home },
  {
    defaultNavigationOptions: headerNavigationOptions,
  },
);

export default createAppContainer(
  createAnimatedSwitchNavigator(
    {
      Splash,
      Welcome,
      HomeStack,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);
