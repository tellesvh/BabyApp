import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import DatePicker from 'react-native-datepicker';
import { setBirthdate, getBirthdate } from '../../util/birthdateManager';
import * as Colors from '../../values/colors';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = { birthdate: '' };
  }

  async componentDidMount() {
    const birthdate = new Date(await getBirthdate());

    this.setState({
      birthdate:
        birthdate.getDate() +
        '/' +
        (birthdate.getMonth() + 1) +
        '/' +
        birthdate.getFullYear(),
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          scrollIndicatorInsets={{ bottom: getBottomSpace() > 0 && 0.1 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: getBottomSpace() > 0 ? getBottomSpace() : 16,
          }}
          style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 4,
              }}>
              Data de Nascimento
            </Text>
            <DatePicker
              style={{ width: 175 }}
              date={this.state.birthdate}
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
                  color: Colors.primaryDarkColor,
                  fontSize: 24,
                  fontWeight: 'bold',
                },
                placeholderText: {
                  color: Colors.primaryDarkColor,
                },
                dateInput: {
                  borderRadius: 500,
                  borderColor: Colors.primaryDarkColor,
                },
              }}
              onDateChange={async date => {
                var parts = date.split('/');
                this.setState({ birthdate: date });
                await setBirthdate(new Date(parts[2], parts[1] - 1, parts[0]));
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
