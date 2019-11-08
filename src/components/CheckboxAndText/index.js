/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Colors from "../../values/colors";
import CheckSvg from '../../../assets/svg/Check';

export default class CheckboxAndText extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress();
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!this.props.isSelected ? (
          <View
            style={{
              borderWidth: 2,
              borderColor: Colors.primaryDarkColor,
              height: 26,
              width: 26,
              marginRight: 8,
              borderRadius: 26 / 2,
            }}
          />
        ) : (
            <View
              style={{
                backgroundColor: Colors.primaryDarkColor,
                height: 26,
                width: 26,
                marginRight: 8,
                borderRadius: 26 / 2,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CheckSvg size={16} color={'white'} />
            </View>
          )}
        <Text style={{ fontSize: 16, flex: 1 }}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
