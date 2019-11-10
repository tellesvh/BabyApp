import AsyncStorage from '@react-native-community/async-storage';

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
  // TODO Remover notificações agendadas
  await AsyncStorage.setItem('@birthdate', birthdate);
  // TODO Agendar notificações
}
