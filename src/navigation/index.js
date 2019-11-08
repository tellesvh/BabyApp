import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NavBar from '../components/NavBar';

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

export default createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Home,
      },
    },
    {
      defaultNavigationOptions: headerNavigationOptions,
    },
  ),
);
