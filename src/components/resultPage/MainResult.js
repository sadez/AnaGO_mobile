import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, Platform, Text,
} from 'react-native';
import Header from '../Header';
import DetailAccordion from './DetailAccordion';
import resultApi from '../../assets/api.json'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812);

class MainResult extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}></Header>
      {
        resultApi ? <DetailAccordion data={resultApi}></DetailAccordion> : null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default MainResult;
