import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SectionList,
  Linking,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import DatePicker from 'react-native-datepicker';
import { setBirthdate, getBirthdate } from '../../util/birthdateManager';
import * as Colors from '../../values/colors';
import YouTubeSvg from '../../../assets/svg/YouTube';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdate: '',
      sectionListData: [
        {
          title: 'Nutrição',
          data: [
            {
              title: 'Saúde Eu Quero Saber: Introdução alimentar',
              url: 'https://youtu.be/hKn6IF_RRv0',
            },
            {
              title: 'Dicas da Amamentação - A importância do leite materno',
              url: 'https://youtu.be/kEfFMQH9kB4',
            },
            {
              title: 'Dicas da amamentação - pega e posicionamento',
              url: 'https://youtu.be/MqcBwc8qH4g',
            },
            {
              title: 'Dicas da amamentação - cuidado com medicamentos',
              url: 'https://youtu.be/xeEXxOQduhM',
            },
          ],
        },

        {
          title: 'Cuidados Com As Crianças',
          data: [
            {
              title: 'Cuidados com as crianças na Primeira infância',
              url: 'https://youtu.be/T0qBJ4-nynM',
            },
            {
              title: 'O Cuidado às Crianças em Desenvolvimento',
              url: 'https://youtu.be/rQDZQ9Cg-sE',
            },
            {
              title: 'Vacinas Para Gestantes',
              url: 'https://youtu.be/NPBsw_BrDXY',
            },
            {
              title: 'Vacinas Para Crianças Até 1 Ano',
              url: 'https://youtu.be/PqGXgyfJVys',
            },
          ],
        },

        {
          title: 'Em Caso de Acidentes e Complicações',
          data: [
            {
              title: 'Como ajudar um bebê engasgado? #1',
              url: 'https://youtu.be/rGf3-IjW7KI',
            },
            {
              title: 'Aprenda a fazer massagem cardíaca em bebês',
              url: 'https://youtu.be/LM3Cs9mCLeU',
            },
            {
              title: 'Como ajudar uma criança engasgada? #2',
              url: 'https://youtu.be/iTWB38HNAcs',
            },
          ],
        },
      ],
    };
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
      <SectionList
        sections={this.state.sectionListData}
        scrollIndicatorInsets={{ bottom: getBottomSpace() > 0 && 0.1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: getBottomSpace() > 0 ? getBottomSpace() + 16 : 16,
        }}
        keyExtractor={(item, index) => item + index}
        stickySectionHeadersEnabled
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(item.url);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: '500', flex: 1 }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '300' }}>
                  Ver no YouTube
                </Text>
              </View>
              <YouTubeSvg size={26} style={{ marginLeft: 10 }} />
            </View>
            <View
              style={{
                height: 1,
                flex: 1,
                backgroundColor: Colors.lightGrayColor,
                borderRadius: 20,
                marginTop: 5,
                marginRight: -16,
              }}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.9)',
              paddingVertical: 8,
            }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
          </View>
        )}
        renderSectionFooter={({ section: { title } }) => (
          <View
            style={{
              height: 16,
            }}
          />
        )}
        ListFooterComponent={
          <>
            <View
              style={{
                height: 1,
                flex: 1,
                // backgroundColor: Colors.primaryDarkColor,
                borderRadius: 20,
                marginBottom: 16,
              }}
            />
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: 4,
                }}>
                Data de Nascimento do Bebê
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
                  await setBirthdate(
                    new Date(parts[2], parts[1] - 1, parts[0]),
                  );
                }}
              />
            </View>
          </>
        }
      />
    );
  }
}
