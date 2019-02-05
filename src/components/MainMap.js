import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Header from './Header';

class MainMAp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header></Header>
        <View style={styles.containerMap}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 33.5883100,
              longitude: -7.6113800,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          </MapView>
        </View>

     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerMap: {
    flex: 5,
  },
  map: {
    height: '100%',
    width: 400,
  },
});

export default MainMAp;
