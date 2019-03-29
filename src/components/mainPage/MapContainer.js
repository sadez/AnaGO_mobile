import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geocode from 'react-geocode';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      marker1: true,
      marker2: false,
      lat: null,
      lon: null,
      defaultLat: this.props.positionMarker1.lat,
      defaultLon: this.props.positionMarker1.lon,
    };
  }

  getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
    let minX; let maxX; let minY; let
      maxY;

    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY) + 0.003;

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY,
    };
  }

  pressDepart() {
    Geocode.setApiKey('AIzaSyCT4AX93nAF79Wty50QfCZnj8BGHcomMN4');
    Geocode.fromLatLng(this.state.lat, this.state.lon).then(
      (response) => {
        let address = response.results[0].formatted_address;
        if (address.length > 31) address = `${address.substring(0, 31)}...`;

        const location = {
          lat: this.state.lat,
          lon: this.state.lon,
          address,
        };
        this.props.position1(location);
        this.setState({
          lat: null,
          lon: null,
          isSearch: false,
        });

        const r = this.getRegionForCoordinates([{
          latitude: this.props.positionMarker1.lat,
          longitude: this.props.positionMarker1.lon,
        }, {
          latitude: this.props.positionMarker2.lat,
          longitude: this.props.positionMarker2.lon,
        }]);

        this.mapView.animateToRegion(r, 800);
      },
      (error) => {
        const location = {
          lat: this.state.lat,
          lon: this.state.lon,
          address: 'this.state.lat,this.state.lon',
        };
        this.props.position1(location);
        this.setState({
          lat: null,
          lon: null,
          isSearch: false,
        });

        console.error(error);
      },
    );
  }

  pressArrivee() {
    Geocode.setApiKey('AIzaSyCT4AX93nAF79Wty50QfCZnj8BGHcomMN4');
    Geocode.fromLatLng(this.state.lat, this.state.lon).then(
      (response) => {
        let address = response.results[0].formatted_address;
        if (address.length > 31) address = `${address.substring(0, 31)}...`;

        const location = {
          lat: this.state.lat,
          lon: this.state.lon,
          address,
        };
        this.props.position2(location);
        this.setState({
          lat: null,
          lon: null,
          isSearch: false,
        });
        // TODO : manage other cases , if position1 or position 2 is null ...
        const r = this.getRegionForCoordinates([{
          latitude: this.props.positionMarker1.lat,
          longitude: this.props.positionMarker1.lon,
        }, {
          latitude: this.props.positionMarker2.lat,
          longitude: this.props.positionMarker2.lon,
        }]);

        this.mapView.animateToRegion(r, 800);
      },
      (error) => {
        const location = {
          lat: this.state.lat,
          lon: this.state.lon,
          address: 'this.state.lat,this.state.lon',
        };
        this.props.position2(location);
        this.setState({
          lat: null,
          lon: null,
          isSearch: false,
        });
        console.error(error);
      },
    );
  }

  // Fetch data from OTP and calculate
  fetchData = () => {
    const {
      positionMarker1, positionMarker2, addData,
    } = this.props;
    this.setState({
      isSearching: true,
    });
    if (positionMarker1.lat > 30 && positionMarker1.lon < 0 && positionMarker2.lat > 30 && positionMarker2.lon < 0) {
      fetch(`https://api.anago.ma/otp/routers/default/plan?fromPlace=${positionMarker1.lat},%20${positionMarker1.lon}&toPlace=${positionMarker2.lat},%20${positionMarker2.lon}&mode=WALK,TRANSIT&maxWalkDistance=700&arriveBy=false&showIntermediateStops=true&maxTransfers=3&preferredAgencies=A1`, { method: 'GET', dataType: 'JSON', headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        .then(resp => resp.json())
        .then((data) => {
          // call for taxi route
          fetch(`https://api.anago.ma/otp/routers/default/plan?fromPlace=${positionMarker1.lat},%20${positionMarker1.lon}&toPlace=${positionMarker2.lat},%20${positionMarker2.lon}&mode=CAR&maxWalkDistance=700&arriveBy=false&showIntermediateStops=true`, { method: 'GET', dataType: 'JSON', headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(resp => resp.json())
            .then((data2) => {
            // ADD petit taxi fares and route
              if (data2.plan) {
                const fare = {
                  fare: {
                    regular: {
                      currency: {
                        symbol: 'MAD',
                        currency: 'MAD',
                        defaultFractionDigits: 2,
                        currencyCode: 'MAD',
                      },
                      cents: 750,
                    },
                  },
                  details: {
                    regular: [
                      {
                        fareId: '1:BUS1',
                        price: {
                          currency: {
                            symbol: 'MAD',
                            currency: 'MAD',
                            defaultFractionDigits: 2,
                            currencyCode: 'MAD',
                          },
                          cents: 750,
                        },
                        routes: [
                          '1:R66',
                        ],
                      },
                    ],
                  },
                };

                fare.fare.regular.cents = Math.round(2 + 0.2 * (Math.round(data2.plan.itineraries[0].legs[0].distance) / 80) * 100 + 50);
                if (fare.fare.regular.cents < 750) {
                  fare.fare.regular.cents = 750;
                }
                // night fare
                const d = new Date();
                const n = d.getHours();
                if (n >= 20 || n < 7) {
                  fare.fare.regular.cents = fare.fare.regular.cents * 1.5;
                }
                data2.plan.itineraries[0].fare = fare;
                data2.plan.itineraries[0].legs[0].mode = 'TAXI';

                if (!data.plan) {
                  addData(data2);
                  this.props.navigation.navigate('MainResult');
                } else {
                  const finalitineries = data.plan.itineraries.concat(data2.plan.itineraries);
                  data.plan.itineraries = finalitineries;
                  addData(data);
                  this.props.navigation.navigate('MainResult');
                }

                // let polylies2fromdata = polylineFromData(data);
                this.setState({
                  isSearching: false,
                });
              }
            })
            .catch((error) => {
              console.log(error, 'catch the second hoop');
              this.setState({
                isSearching: false,
              });
            });

          this.setState({
            isSearching: false,
          });
        })
        .catch((error) => {
          this.setState({
            isSearching: false,
          });
        });
    } else {
      this.setState({
        isSearching: false,
      });
    }
  }

  render() {
    const { positionMarker1, positionMarker2 } = this.props;
    return (
      <View style={styles.containerMap}>
        <TouchableOpacity style={styles.validateInputA} onPress={() => this.fetchData()}>
            <Text style={{
              padding: 12, color: 'white', fontSize: 13, fontFamily: 'PTSans-Bold',
            }}>AnaGO</Text>
      </TouchableOpacity>
        {
          this.state.isSearch
            ? <View style={styles.containerValidateInput}>
              <TouchableOpacity style={styles.validateInputD} onPress={() => this.pressDepart()}>
                  <Text style={{
                    padding: 12, color: 'white', fontSize: 13, fontFamily: 'PTSans-Bold',
                  }}>Départ</Text>
            </TouchableOpacity>
              <TouchableOpacity style={styles.validateInputA} onPress={() => this.pressArrivee()}>
                  <Text style={{
                    padding: 12, color: 'white', fontSize: 13, fontFamily: 'PTSans-Bold',
                  }}>Arrivée</Text>
            </TouchableOpacity>

            </View>

            : null
        }
        <MapView
          ref = {(ref) => { this.mapView = ref; }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.state.defaultLat,
            longitude: this.state.defaultLon,
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
        pinColor={'yellow'}
        /> : null
      }
      {
        (positionMarker1.lat && positionMarker1.lon)
          ? <Marker coordinate={{
            latitude: positionMarker1.lat,
            longitude: positionMarker1.lon,
          }}
          pinColor={'#4CAF50'}
        /> : null
      }
      {
        (positionMarker2.lat && positionMarker2.lon)
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
    margin: 5,
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
    margin: 5,
  },
});
const mapStateToProps = state => ({
  positionMarker1: state.map.positionMarker1,
  positionMarker2: state.map.positionMarker2,
});

const mapDispatchToProps = dispatch => ({
  selectRoute: payload => dispatch({ type: 'SELECT_ROUTE', payload }),
  position1: payload => dispatch({ type: 'ADD_POSITION1', payload }),
  position2: payload => dispatch({ type: 'ADD_POSITION2', payload }),
  addData: payload => dispatch({ type: 'ADD_DATA', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
