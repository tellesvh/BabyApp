import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';

export async function hasStoredBirthdate() {
  const birthDateFromAsyncStorage = await AsyncStorage.getItem('@birthdate');
  return birthDateFromAsyncStorage !== null;
  // if (birthDateFromAsyncStorage !== null) {
  //   return true;
  // } else {
  //   return false;
  // }
}

export async function getBirthdate() {
  return await AsyncStorage.getItem('@birthdate');
}

export async function setBirthdate(birthdate) {
  PushNotification.cancelAllLocalNotifications();

  await AsyncStorage.setItem('@birthdate', birthdate.toString());

  // TODO Agendar notificações

  // PushNotification.localNotificationSchedule({
  //   //... You can use all the options from localNotifications
  //   message: 'My Notification Message', // (required)
  //   date: new Date(Date.now() + 5 * 1000), // in 5 secs
  // });
}

export function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  if (d2.getDate() >= d1.getDate()) months++;
  return months <= 0 ? 0 : months;
}
