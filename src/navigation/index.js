import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import NavBar from '../components/NavBar';

import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome';

import Home from '../screens/Home';
import Info from '../screens/Info';

import * as Colors from '../values/colors';

const mainHeaderNavigationOptions = ({ navigation }) => {
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

const infoHeaderNavigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Informações',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: Colors.primaryColor,
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTitleStyle: {
      color: '#FFF',
    },
    headerBackTitle: null,
  };
};

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: mainHeaderNavigationOptions,
  },
  Info: {
    screen: Info,
    navigationOptions: infoHeaderNavigationOptions,
  },
});

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
