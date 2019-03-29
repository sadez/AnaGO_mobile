import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import PrimaryMarker from './mapsComponents/PrimaryMarker'; // remove PROVIDER_GOOGLE import if not using Google Maps
import SecondaryMarker from './mapsComponents/SecondaryMarker'; // remove PROVIDER_GOOGLE import if not using Google Maps

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: true,
      marker1: true,
      marker2: false,
      lat: 33.5883100,
      lon: -7.6113800,
      defaultLat: 33.5883100,
      defaultLon: -7.6113800,
    };
  }

  render() {
    const { positionMarker1, positionMarker2 } = this.props;
    return (
      <View style={styles.containerMap}>
        {
          this.state.isSearch
            ? <View style={styles.containerValidateInput}>

              <TouchableOpacity style={styles.validateInputD} >
                  <Text style={{ fontSize: 12 }}>Départ</Text>
            </TouchableOpacity>
              <TouchableOpacity style={styles.validateInputA}>
                  <Text style={{ fontSize: 12 }}>Arrivée</Text>
            </TouchableOpacity>

            </View>

            : null
        }
        <MapView
          ref = {ref => this.mapView = ref}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 33.5883100,
            longitude: -7.6113800,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsMyLocationButton={true}
          loadingEnabled={true}
          onLongPress={(e) => {
            const r = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            };
            this.mapView.animateToRegion(r, 800);
            this.setState({ lat: e.nativeEvent.coordinate.latitude, lon: e.nativeEvent.coordinate.longitude, isSearch: true });
          }
          }
        >
      {
      (this.state.lat && this.state.lon)
        ? <Marker coordinate={{
          latitude: this.state.lat,
          longitude: this.state.lon,
        }}
        /> : null
      }
      {
        positionMarker1.lat
          ? <Marker coordinate={{
            latitude: positionMarker1.lat,
            longitude: positionMarker1.lon,
          }}
          pinColor={'#4CAF50'}
        /> : null
      }
      {
        positionMarker2.lat
          ? <Marker coordinate={{
            latitude: positionMarker2.lat,
            longitude: positionMarker2.lon,
          }}
          pinColor={'#F44336'}/> : null
      }
        {/* <PrimaryMarker/>
        <SecondaryMarker/> */}
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
  containerValidateInput: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: '0%',
    alignItems: 'center',
    zIndex: 1,
    borderRadius: 5,
    justifyContent: 'center',
  },
  validateInputD: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    opacity: 0.8,
    borderRadius: 5,
    width: 100,
    height: 35,
    zIndex: 1,
  },
  validateInputA: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    opacity: 0.8,
    borderRadius: 5,
    width: 100,
    height: 35,
    zIndex: 1,
  },
});
const mapStateToProps = state => ({
  positionMarker1: state.map.positionMarker1,
  positionMarker2: state.map.positionMarker2,
});

const mapDispatchToProps = dispatch => ({
  selectRoute: payload => dispatch({ type: 'SELECT_ROUTE', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
