import React, { Component } from 'react';
import { Text, View, SafeAreaView, StatusBar } from 'react-native';
import * as Colors from '../../values/colors';
import DatePicker from 'react-native-datepicker';
import { setBirthdate } from '../../util/birthdateManager';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '' };
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.primaryDarkColor,
        }}>
        <StatusBar barStyle="light-content" />
        <View style={{ padding: 16, justifyContent: 'center', flex: 1 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 24,
            }}>
            BabyApp
          </Text>
          <Text style={{ fontSize: 56, fontWeight: '200', color: 'white' }}>
            Olá!
          </Text>
          <Text style={{ fontSize: 26, fontWeight: '400', color: 'white' }}>
            Para que possamos otimizar a experiência de uso do app, por favor,
            insira a data de nascimento do seu bebê.
          </Text>

          <DatePicker
            style={{ width: 225, marginTop: 16 }}
            date={this.state.date}
            mode="date"
            placeholder="Inserir Data de Nascimento"
            format="DD/MM/YYYY"
            maxDate={new Date()}
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            showIcon={false}
            locale="pt-br"
            customStyles={{
              dateText: {
                color: '#FFF',
                fontSize: 16,
                fontWeight: 'bold',
              },
              placeholderText: {
                color: '#FFF',
              },
              dateInput: {
                borderRadius: 500,
                borderColor: '#FFF',
              },
            }}
            onDateChange={async date => {
              var parts = date.split('/');
              this.setState({ date: date });
              await setBirthdate(new Date(parts[2], parts[1] - 1, parts[0]));
              this.props.navigation.navigate('Home');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
