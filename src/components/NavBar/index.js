import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import * as Colors from '../../values/colors';
import InformationSvg from '../../../assets/svg/Information';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          backgroundColor: Colors.primaryColor,
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.primaryColor}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          Nome do App
        </Text>
        <TouchableOpacity onPress={() => { }}>
          <InformationSvg size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default NavBar;
