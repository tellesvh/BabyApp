import React, { Component } from 'react';
import { Text, View, Dimensions, FlatList, ScrollView } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import * as Colors from '../../values/colors';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import axios from 'axios';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import CheckboxAndText from '../../components/CheckboxAndText';
import AsyncStorage from '@react-native-community/async-storage';
import { getBirthdate } from '../../util/birthdateManager';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalInfo: [],
      selectedInfos: [],
    };
  }

  async componentDidMount() {
    axios
      .get('https://sheetsu.com/apis/v1.0su/b355b384e990')
      .then(async res => {
        this.setState(
          {
            generalInfo: res.data,
          },
          async () => {
            const selectedInfosFromAsyncStorage = await AsyncStorage.getItem(
              '@selectedInfos',
            );
            if (selectedInfosFromAsyncStorage !== null) {
              this.setState({
                selectedInfos: JSON.parse(selectedInfosFromAsyncStorage),
              });
            }
            this.setInitialPageForBirthdate(await getBirthdate());
          },
        );
      });
  }

  setInitialPageForBirthdate(birthdate) {
    console.log(birthdate);
    const monthDiff = this.monthDiff(new Date(birthdate), new Date()) + 1;
    this.scrollableTabView.goToPage(monthDiff - 1);
  }

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    // edit: increment months if d2 comes later in its month than d1 in its month
    if (d2.getDate() >= d1.getDate()) months++;
    // end edit
    return months <= 0 ? 0 : months;
  }

  handleSelection(index, uniqueInfo, firstOrSecondInfo) {
    let selectedInfos = [...this.state.selectedInfos];
    let selectedInfosIndex = selectedInfos.findIndex(
      item => item.section === uniqueInfo.tabBarTitle,
    );
    if (selectedInfosIndex !== -1) {
      let infoIndex;
      switch (firstOrSecondInfo) {
        case 0:
          infoIndex = selectedInfos[
            selectedInfosIndex
          ].firstInfoSelected.findIndex(item => item === index);

          if (infoIndex === -1) {
            selectedInfos[selectedInfosIndex].firstInfoSelected.push(index);
          } else {
            selectedInfos[selectedInfosIndex].firstInfoSelected = selectedInfos[
              selectedInfosIndex
            ].firstInfoSelected.filter(function (item) {
              return item !== index;
            });
          }
          break;
        case 1:
          infoIndex = selectedInfos[
            selectedInfosIndex
          ].secondInfoSelected.findIndex(item => item === index);

          if (infoIndex === -1) {
            selectedInfos[selectedInfosIndex].secondInfoSelected.push(index);
          } else {
            selectedInfos[
              selectedInfosIndex
            ].secondInfoSelected = selectedInfos[
              selectedInfosIndex
            ].secondInfoSelected.filter(function (item) {
              return item !== index;
            });
          }
          break;
      }
    } else {
      switch (firstOrSecondInfo) {
        case 0:
          selectedInfos.push({
            section: uniqueInfo.tabBarTitle,
            firstInfoSelected: [index],
            secondInfoSelected: [],
          });
          break;
        case 1:
          selectedInfos.push({
            section: uniqueInfo.tabBarTitle,
            firstInfoSelected: [],
            secondInfoSelected: [index],
          });
          break;
      }
    }

    this.setState({
      selectedInfos,
    });

    AsyncStorage.setItem('@selectedInfos', JSON.stringify(selectedInfos));
  }

  isSelected(index, uniqueInfo, firstOrSecondInfo) {
    let selectedInfos = [...this.state.selectedInfos];
    let selectedInfosIndex = selectedInfos.findIndex(
      item => item.section === uniqueInfo.tabBarTitle,
    );
    if (selectedInfosIndex !== -1) {
      let infoIndex;

      switch (firstOrSecondInfo) {
        case 0:
          infoIndex = selectedInfos[
            selectedInfosIndex
          ].firstInfoSelected.findIndex(item => item === index);
          break;
        case 1:
          infoIndex = selectedInfos[
            selectedInfosIndex
          ].secondInfoSelected.findIndex(item => item === index);
          break;
      }

      if (infoIndex === -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  findSelectedItemsForSection(uniqueInfo) {
    let selectedInfos = this.state.selectedInfos.filter(
      item => item.section === uniqueInfo.tabBarTitle,
    );

    if (selectedInfos[0]) {
      return (
        selectedInfos[0].firstInfoSelected.length +
        selectedInfos[0].secondInfoSelected.length
      );
    } else {
      return 0;
    }
  }

  findTotalForSection(uniqueInfo) {
    let firstInfoArray = JSON.parse(uniqueInfo.firstInfo);
    let secondInfoArray = JSON.parse(uniqueInfo.secondInfo);

    return firstInfoArray.length + secondInfoArray.length;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          ref={scrollableTabView =>
            (this.scrollableTabView = scrollableTabView)
          }
          // initialPage={this.state.page}
          prerenderingSiblingsNumber={6}
          renderTabBar={() => (
            <ScrollableTabBar
              activeTextColor={'#FFF'}
              inactiveTextColor="rgba(255,255,255,0.5)"
              underlineStyle={{ backgroundColor: '#FFF' }}
              style={{
                backgroundColor: Colors.primaryDarkColor,
                borderBottomWidth: 0,
              }}
            />
          )}>
          {this.state.generalInfo.map((uniqueInfo, uniqueInfoIndex) => {
            let firstInfoArray = JSON.parse(uniqueInfo.firstInfo);
            let secondInfoArray = JSON.parse(uniqueInfo.secondInfo);
            return (
              <ScrollView
                tabLabel={uniqueInfo.tabBarTitle}
                scrollIndicatorInsets={{ bottom: getBottomSpace() > 0 && 0.1 }}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  // paddingTop: 16,
                  paddingBottom: getBottomSpace() > 0 ? getBottomSpace() : 16,
                }}
                stickyHeaderIndices={[0]}
                style={{ flex: 1 }}>
                <View
                  style={{
                    paddingTop: 16,
                    paddingBottom: 16,
                    backgroundColor: '#FFF',
                  }}>
                  {/* <Text>
                    {this.findSelectedItemsForSection(uniqueInfo)} de{' '}
                    {this.findTotalForSection(uniqueInfo)}
                  </Text> */}
                  <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 42 }}>
                      {this.findSelectedItemsForSection(uniqueInfo)}
                      <Text style={{ fontSize: 18, fontWeight: 'normal' }}>
                        {' '}
                        de {this.findTotalForSection(uniqueInfo)}
                      </Text>
                    </Text>
                  </View>
                  <ProgressBarAnimated
                    width={Dimensions.get('screen').width - 32}
                    value={
                      (this.findSelectedItemsForSection(uniqueInfo) /
                        this.findTotalForSection(uniqueInfo)) *
                      100
                    }
                    borderRadius={300}
                    barAnimationDuration={300}
                    backgroundColorOnComplete={Colors.primaryDarkColor}
                  />
                </View>
                <View style={{ marginBottom: 24 }}>
                  <FlatList
                    data={firstInfoArray}
                    extraData={this.state}
                    renderItem={({ item, index }) => (
                      <CheckboxAndText
                        text={item}
                        onPress={() => {
                          this.handleSelection(index, uniqueInfo, 0);
                        }}
                        isSelected={this.isSelected(index, uniqueInfo, 0)}
                      />
                    )}
                    keyExtractor={(item, index) => `${index}`}
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 12 }} />
                    )}
                  />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 24,
                      marginBottom: 8,
                    }}>
                    Estímulos
                  </Text>
                  <FlatList
                    data={secondInfoArray}
                    renderItem={({ item, index }) => (
                      <CheckboxAndText
                        text={item}
                        onPress={() => {
                          this.handleSelection(index, uniqueInfo, 1);
                        }}
                        isSelected={this.isSelected(index, uniqueInfo, 1)}
                      />
                    )}
                    keyExtractor={(item, index) => `${index}`}
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 12 }} />
                    )}
                  />
                </View>
              </ScrollView>
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}
