import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, Platform,
} from 'react-native';
import Header from '../Header';
import MapContainer from './MapContainer';
import FormSearch from './FormSearch';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812);

class MainMap extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header isHome></Header>
        <FormSearch></FormSearch>
        <MapContainer></MapContainer>
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

export default MainMap;
