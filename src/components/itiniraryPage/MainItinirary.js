import React, { Component } from 'react';
import {
  StyleSheet, View, FlatList, TextInput, Dimensions, TouchableOpacity,
} from 'react-native';
import { Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import WalkRoute from '../resultPage/routes/WalkRoute';
import TransitRoute from '../resultPage/routes/TransitRoute';
import ItiniraryList from './ItiniraryList';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class MainItinirary extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    const { selectedRoute } = this.props;
    return (
      <View>
        <View style={styles.containerBlocDepart}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
              <Icon style={{
                fontSize: 20, color: 'white', paddingRight: 5,
              }} name="ios-arrow-back" />
            <Text style={{ color: 'white', fontSize: 12 }}>Retour</Text>
          </TouchableOpacity>
        </View>

        {
          selectedRoute.legs
            ? <View style={styles.container}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.minuteText}> {'Départ :  18h30'} </Text>
                <Text style={styles.minuteText}> {'Arrivée : 18h30'} </Text>
              </View>
            <View style={styles.containerTextDepart}>
              {
                selectedRoute.legs.map((leg, i) => {
                  if (leg.mode === 'WALK') {
                    return (
                      <WalkRoute
                        key={i}
                        distance={ Math.round(leg.distance * 100 / 100)}
                        isLast={(i === (selectedRoute.legs.length - 1))}
                        />
                    );
                  }
                  if (leg.mode === 'TAXI') {
                    return (
                      <React.Fragment key={i}>
                        <View></View>
                          <Icon style={{
                            fontSize: 30, paddingHorizontal: 8, paddingVertical: 3, color: 'white', backgroundColor: '#8B0000', borderRadius: 18,
                          }} name="md-car" />
                        <Text style={styles.minuteText}> {'Petit Taxi'} </Text>
                      </React.Fragment>);
                  }
                  return (
                      <TransitRoute
                        type={leg.mode}
                        key={i}
                        routeName={leg.routeShortName}
                        isLast={(i === (selectedRoute.legs.length - 1))}
                        />
                  );
                })
              }
              <View>
                <View style={{ backgroundColor: 'black', alignItems: 'center' }}>
                  <Text style = {{ color: 'white', fontSize: 12, fontFamily: 'PTSans-Bold' }}>{Math.round((selectedRoute.fare.fare.regular.cents / 100) * 2) / 2} {'Dhs'}</Text>
                </View>
                <Text style={styles.timeText}> {Math.round(selectedRoute.duration / 60)} </Text>
                <Text style={styles.minuteText}> {'Minutes'} </Text>
              </View>

            </View>
            </View>
            : null
        }

        <View style={styles.containerDetailItinirary}>
          <ItiniraryList legs={selectedRoute.legs}></ItiniraryList>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  containerTextDepart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 70,
  },
  container: {
    borderColor: '#efefef',
    borderWidth: 1,
    backgroundColor: '#fbfbfb',
    elevation: 1,
    borderRadius: 2,
    padding: 8,
    zIndex: 1,
    marginHorizontal: 0,
    marginVertical: 5,
  },
  timeText: {
    fontSize: 32,
    fontFamily: 'PTSans-Bold',
    color: 'black',
  },
  minuteText: {
    fontSize: 14,
    fontFamily: 'PTSans-Regular',
    color: 'grey',
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
  containerDetailItinirary: {
    borderColor: '#1a7746',
    borderWidth: 0.5,
    backgroundColor: '#fbfbfb',
    elevation: -1,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
    zIndex: 1,
    marginHorizontal: 0,
  },
});

const mapStateToProps = state => ({
  selectedRoute: state.map.selectedRoute,
});

const mapDispatchToProps = dispatch => ({
  position1: payload => dispatch({ type: 'ADD_POSITION1', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainItinirary);
