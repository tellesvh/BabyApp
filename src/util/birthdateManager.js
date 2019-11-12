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

  for (let i = 1; i <= 12; i++) {
    const newDate = new Date(birthdate);
    newDate.setMonth(birthdate.getMonth() + i);
    newDate.setHours(10, 0, 0);

    if (isDateAfterToday(newDate)) {
      PushNotification.localNotificationSchedule({
        title: `Feliz ${i < 12 ? 'Mesversario' : 'Aniversário'}!`,
        message: 'Acompanhe a evolução do seu bebê no nosso app! ;)',
        date: newDate,
      });
    }
  }
}

function isDateAfterToday(date) {
  return new Date(date.toDateString()) > new Date(new Date().toDateString());
  // return (
  //   new Date(date.toDateString()) > new Date(new Date().toDateString()) - 6000
  // );
}

export function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  if (d2.getDate() >= d1.getDate()) months++;
  return months <= 0 ? 0 : months;
}
