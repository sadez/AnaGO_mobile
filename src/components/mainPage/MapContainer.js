import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import PrimaryMarker from './mapsComponents/PrimaryMarker'; // remove PROVIDER_GOOGLE import if not using Google Maps
import SecondaryMarker from './mapsComponents/SecondaryMarker'; // remove PROVIDER_GOOGLE import if not using Google Maps

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker1: true,
      marker2: false,
      lat: 33.5883100,
      lng: -7.6113800,
    };
  }

  render() {
    return (
      <View style={styles.containerMap}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsMyLocationButton={true}
          loadingEnabled={true}
          onPress={e => this.setState({ lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude })}
        >
        <PrimaryMarker/>
        <SecondaryMarker/>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMap: {
    flex: 5,
  },
  map: {
    height: '100%',
    width: 400,
  },
  marker: {
    width: 100,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default MapContainer;
