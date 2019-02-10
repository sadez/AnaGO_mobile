import React, { Component } from 'react';
import { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  StyleSheet, View, Text, TouchableOpacity, Dimensions, Button,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SecondaryMarker extends Component {
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
      <Marker
          coordinate={{
            latitude: this.state.lat,
            longitude: this.state.lng,
          }}
          centerOffset={{ x: -18, y: -60 }}
          anchor={{ x: 1, y: 1 }}
        >
              <TouchableOpacity style={styles.buttonAnago} >
                <Text style = {{ color: 'white', fontSize: 14 }}> Arrivée ici </Text>
              </TouchableOpacity>

        </Marker>
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
    width: 300,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  buttonAnago: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    width: 100,
    borderRadius: 5,
    color: 'white',
    elevation: 2,
  },
});

export default SecondaryMarker;
