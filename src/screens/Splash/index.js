import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { hasStoredBirthdate } from '../../util/birthdateManager';

export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (await hasStoredBirthdate()) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Welcome');
    }
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}
