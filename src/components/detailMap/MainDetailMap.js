import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Dimensions,
} from 'react-native';
import { Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import MapView, {
  PROVIDER_GOOGLE, Polyline, Circle, Marker,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import flagPinkImg from '../../assets/flag-pink.png';

// uses of decoding polylines
const decoPolyline = require('@mapbox/polyline');

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// function returning array of polyline and mode from OSM data list of itineraries
function polylineFromData(data) {
  const arrayOfPolylines = [];
  if (data.plan.itineraries) {
    for (let i = 0; i < data.plan.itineraries.length; i += 1) {
      arrayOfPolylines.push([]);
    }
    for (let i = 0; i < data.plan.itineraries.length; i += 1) {
      for (let j = 0; j < data.plan.itineraries[i].legs.length; j += 1) {
        arrayOfPolylines[i].push(
          {
            polyline: decoPolyline.decode(data.plan.itineraries[i].legs[j].legGeometry.points),
            mode: data.plan.itineraries[i].legs[j].mode,
          },
        );
      }
    }
  }
  return arrayOfPolylines;
}

function averageGeolocation(coords) {
  if (coords.length === 1) {
    return coords[0];
  }

  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  for (const coord of coords) {
    const latitude = coord.latitude * Math.PI / 180;
    const longitude = coord.longitude * Math.PI / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

  const total = coords.length;

  x /= total;
  y /= total;
  z /= total;

  const centralLongitude = Math.atan2(y, x);
  const centralSquareRoot = Math.sqrt(x * x + y * y);
  const centralLatitude = Math.atan2(z, centralSquareRoot);

  return {
    latitude: centralLatitude * 180 / Math.PI,
    longitude: centralLongitude * 180 / Math.PI,
  };
}

class MainDetailMap extends Component {
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
    const { selectedLeg, selectedPoly } = this.props;
    let polylines = [];
    const polylinesReturn = [];
    if (selectedLeg.legGeometry) {
      polylines = decoPolyline.decode(selectedLeg.legGeometry.points);
      for (let i = 0; i < polylines.length; i += 1) {
        polylinesReturn.push({ latitude: polylines[i][0], longitude: polylines[i][1] });
      }
    }

    const centerMap = averageGeolocation(polylinesReturn);

    return (
      <View style={styles.containerMap}>
        <View style={styles.containerBlocDepart}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
              <Icon style={{
                fontSize: 20, color: 'white', paddingRight: 5,
              }} name="ios-arrow-back" />
            <Text style={{ color: 'white', fontSize: 12 }}>Retour</Text>
          </TouchableOpacity>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: centerMap.latitude,
            longitude: centerMap.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00922 * ASPECT_RATIO,
          }}
          showsMyLocationButton={true}
          loadingEnabled={true}
          onPress={e => this.setState({ lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude })}
        >

        {
          selectedPoly
            ? selectedPoly.map((poly, i) => {
              switch (poly.mode) {
                case 'WALK':
                  return (<Polyline lineDashPattern={[47.12]} strokeColor="grey" strokeWidth={4} key={i} coordinates={poly.polyline} />);
                case 'TRAM':
                  return (<Polyline strokeColor="#FDAE10" strokeWidth={4} key={i} coordinates={poly.polyline} />);
                case 'BUS':
                  return (<Polyline strokeColor="#000FA3" strokeWidth={4} key={i} coordinates={poly.polyline} />);
                case 'RAIL':
                  return (<Polyline strokeColor="#6D6049" strokeWidth={4} key={i} coordinates={poly.polyline} />);
                case 'TAXI':
                  return (<Polyline strokeColor="#8B0000" strokeWidth={4} key={i} coordinates={poly.polyline} />);
                case 'GTAXI':
                  return (<Polyline strokeColor="grey" strokeWidth={4} key={i} coordinates={poly.polyline} />);
                default:
                  return (<Polyline strokeColor="#3F51B5" strokeWidth={4} key={i} coordinates={poly.polyline} />);
              }
            }) : null
        }
        {
          selectedPoly
            ? selectedPoly.map((poly, j) => {
              switch (poly.mode) {
                case 'WALK':
                  return (<Circle key={j} center={poly.polyline[poly.polyline.length - 1]} strokeColor="grey" strokeWidth={4} radius={14}></Circle>);
                case 'TRAM':
                  return (<React.Fragment key={j}>
                  <Circle center={poly.polyline[0]} strokeColor="#FDAE10" strokeWidth={4} radius={14}></Circle>
                  <Circle center={poly.polyline[poly.polyline.length - 1]} strokeColor="#FDAE10" strokeWidth={4} radius={14}></Circle>
                </React.Fragment>);
                case 'BUS':
                  return (<React.Fragment key={j}>
                  <Circle center={poly.polyline[0]} strokeColor="#000FA3" strokeWidth={4} radius={14}></Circle>
                  <Circle center={poly.polyline[poly.polyline.length - 1]} strokeColor="#000FA3" strokeWidth={4} radius={14}></Circle>
                </React.Fragment>);
                case 'RAIL':
                  return (<React.Fragment key={j}>
                  <Circle center={poly.polyline[0]} strokeColor="#6D6049" strokeWidth={4} radius={14}></Circle>
                  <Circle center={poly.polyline[poly.polyline.length - 1]} strokeColor="#6D6049" strokeWidth={4} radius={14}></Circle>
                </React.Fragment>);
                case 'TAXI':
                  return (<React.Fragment key={j}>
                  <Circle center={poly.polyline[0]} strokeColor="#8B0000" strokeWidth={4} radius={14}></Circle>
                  <Circle center={poly.polyline[poly.polyline.length - 1]} strokeColor="#8B0000" strokeWidth={4} radius={14}></Circle>
                </React.Fragment>);
                case 'GTAXI':
                  return (<React.Fragment key={j}>
                  <Circle center={poly.polyline[0]} strokeColor="grey" strokeWidth={4} radius={14}></Circle>
                  <Circle center={poly.polyline[poly.polyline.length - 1]} strokeColor="grey" strokeWidth={4} radius={14}></Circle>
                </React.Fragment>);
                default:
                  return (<Circle key={j} center={poly.polyline[poly.polyline.length - 1]} strokeColor="red" strokeWidth={4} radius={7}></Circle>);
              }
            })

            : null
        }

        <Marker coordinate={selectedPoly[0].polyline[0]}/>
        <Marker coordinate={selectedPoly[selectedPoly.length - 1].polyline[selectedPoly[selectedPoly.length - 1].polyline.length - 1]}/>

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
  containerBlocDepart: {
    borderColor: '#1a7746',
    borderWidth: 0.5,
    backgroundColor: '#2bc875',
    elevation: -1,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
    zIndex: 1,
    marginHorizontal: 0,
  },
});

const mapStateToProps = state => ({
  selectedLeg: state.map.selectedLeg,
  selectedPoly: state.map.selectedPoly,
});

export default connect(mapStateToProps, null)(MainDetailMap);
