import React, { Component } from 'react';
import {
  StyleSheet, View, FlatList, TouchableOpacity,
} from 'react-native';
import { Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import WalkRoute from './routes/WalkRoute';
import TransitRoute from './routes/TransitRoute';

class ListRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  // pagination
  selectRoute(item) {
    this.props.selectRoute(item);
    this.props.navigation.navigate('MainItinirary');
  }

  renderItem = ({ item }) => {
    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);
    const startTimeParse = `${startTime.getHours()}:${startTime.getMinutes() < 10 ? '0' : ''}${startTime.getMinutes()}`;
    const endTimeParse = `${endTime.getHours()}:${endTime.getMinutes() < 10 ? '0' : ''}${endTime.getMinutes()}`;
    return (
      <TouchableOpacity style={styles.container} onPress={() => { this.selectRoute(item); }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.minuteText}> {`Départ : ${startTimeParse}`} </Text>
          <Text style={styles.minuteText}> {`Arrivée : ${endTimeParse}`} </Text>
        </View>
        <View style={styles.containerTextDepart}>
        {
          item.legs.map((leg, i) => {
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
            if (leg.mode !== 'WALK') {
              let isLast = false;
              if (item.legs[item.legs.length - 1].mode === 'WALK') {
                isLast = (i === (item.legs.length - 2));
              } else {
                isLast = (i === (item.legs.length - 1));
              }
              return (
                <React.Fragment key={i}>
                    <View></View>
                    <TransitRoute
                      style={{ top: 10 }}
                      type={leg.mode}
                      routeName={leg.routeShortName}
                      isLast={isLast}
                      />
                  </React.Fragment>
              );
            }
            // if (leg.mode === 'WALK') {
            //   return (
            //     <WalkRoute
            //       style={{ top: 10 }}
            //       key={i}
            //       distance={ Math.round(leg.distance * 100 / 100)}
            //       isLast={(i === (item.legs.length - 1))}
            //       />
            //   );
            // }

            return null;
          })
        }
        <View>
          <View style={{ backgroundColor: 'black', alignItems: 'center' }}>
            <Text style = {{ color: 'white', fontSize: 12, fontFamily: 'PTSans-Bold' }}>{Math.round((item.fare.fare.regular.cents / 100) * 2) / 2} {'Dhs'}</Text>
          </View>
          <Text style={styles.timeText}> {Math.round(item.duration / 60)} </Text>
          <Text style={styles.minuteText}> {'Minutes'} </Text>
          {/* <Text style={styles.timeText}> {Math.round((item.fare.fare.regular.cents / 100) * 2) / 2} </Text>
          <Text style={styles.minuteText}> {'Dhs'} </Text> */}
        </View>

      </View>
      </TouchableOpacity>
    );
  };

  renderHeader = () => (
    <View style={styles.containerBlocDepart}>

      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('MainMap')}>
          <Icon style={{
            fontSize: 20, color: 'white', paddingRight: 5,
          }} name="ios-arrow-back" />
        <Text style={{ color: 'white', fontSize: 12 }}>Retour</Text>
      </TouchableOpacity>

      <View style={styles.containerBlocDepartChild}>
        <View style={{ flex: 4 }}>

          <View style={{
            height: 80, borderWidth: 1, borderColor: 'white', borderRadius: 6, width: '100%', marginVertical: 5,
          }}>
            <Text style={{
              padding: 12, color: 'white', fontSize: 12, fontFamily: 'PTSans-Bold',
            }}>{this.props.positionMarker1.address}</Text>
          </View>
          <View style={{
            height: 80, borderWidth: 1, borderColor: 'white', borderRadius: 6, width: '100%', marginVertical: 5,
          }}>
          <Text style={{
            padding: 12, color: 'white', fontSize: 12, fontFamily: 'PTSans-Bold',
          }}>{this.props.positionMarker2.address}</Text>

          </View>
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

  );

  renderFooter = () => (
    <View style={styles.containerTextDepart}>
     <Text> Need another route ? </Text>
    </View>

  );

  render() {
    return (

          <FlatList
            data={this.props.data.plan.itineraries}
            renderItem={this.renderItem}
            extraData={this.props.selectedRoute}
            keyExtractor={item => `index${item.walkDistance}`}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            showsVerticalScrollIndicator={false}
          />

    );
  }
}

const styles = StyleSheet.create({
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
    marginHorizontal: 10,
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
});

const mapStateToProps = state => ({
  positionMarker1: state.map.positionMarker1,
  positionMarker2: state.map.positionMarker2,
  selectedRoute: state.map.selectedRoute,
});

const mapDispatchToProps = dispatch => ({
  selectRoute: payload => dispatch({ type: 'SELECT_ROUTE', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListRoutes);
