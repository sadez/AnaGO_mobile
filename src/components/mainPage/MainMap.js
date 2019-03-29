import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, Platform, TouchableOpacity,
} from 'react-native';
import { Text, Icon } from 'native-base';
import { connect } from 'react-redux';
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
        <View style={styles.containerBlocDepart}>

          <View style={styles.containerBlocDepartChild}>
            <View style={{ flex: 4 }}>

              <TouchableOpacity style={{
                height: 65, borderWidth: 1, borderColor: 'white', borderRadius: 6, width: '100%', marginVertical: 5,
              }}
              onPress={() => {
                this.props.navigation.navigate('InputSelectMain', {
                  isDepart: true,
                });
              }}

              >
                <Text style={{
                  padding: 12, color: 'white', fontSize: 13, fontFamily: 'PTSans-Bold',
                }}>{`Départ : ${this.props.positionMarker1.address}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                height: 65, borderWidth: 1, borderColor: 'white', borderRadius: 6, width: '100%', marginVertical: 5,
              }}
              onPress={() => {
                this.props.navigation.navigate('InputSelectMain', {
                  isDepart: false,
                });
              }}
              >
              <Text style={{
                padding: 12, color: 'white', fontSize: 13, fontFamily: 'PTSans-Bold',
              }}>{`Arrivée : ${this.props.positionMarker2.address}`}</Text>

              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>

                  <Icon style={{
                    fontSize: 30, paddingLeft: 20, paddingVertical: 3, color: 'white',
                  }} name="ios-arrow-down" />
                  <Icon style={{
                    fontSize: 30, paddingVertical: 3, color: 'white',
                  }} name="ios-arrow-up" />

            </TouchableOpacity>
          </View>

        </View>
        {/* <FormSearch navigation={this.props.navigation}></FormSearch> */}
      <View style={styles.container}>
        <MapContainer navigation={this.props.navigation}></MapContainer>
      </View>

     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
  },
  containerBlocDepartChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    minHeight: 70,
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
  positionMarker1: state.map.positionMarker1,
  positionMarker2: state.map.positionMarker2,
  selectedRoute: state.map.selectedRoute,
});

const mapDispatchToProps = dispatch => ({
  selectRoute: payload => dispatch({ type: 'SELECT_ROUTE', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMap);
