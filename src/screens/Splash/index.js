import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { hasStoredBirthdate } from '../../util/birthdateManager';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

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

    PushNotification.configure({
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      requestPermissions: true,
    });
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}
