import React, { Component } from 'react';
import {
  StyleSheet, View, FlatList, TextInput, Dimensions,
} from 'react-native';
import { Text, Icon } from 'native-base';
import Moment from 'react-moment';
import WalkRoute from './routes/WalkRoute';
import TransitRoute from './routes/TransitRoute';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ListRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  renderItem = ({ item }) => (
    <View style={styles.containerTextDepart}>

      {
        item.legs.map((leg, i) => {
          if (leg.mode === 'WALK') {
            return (
              <WalkRoute
                key={i}
                distance={ Math.round(leg.distance * 100 / 100)}
                isLast={(i === (item.legs.length - 1))}
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
                isLast={(i === (item.legs.length - 1))}
                />
          );
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

  );

  renderHeader = () => (
    <View style={styles.containerBlocDepartDestination}>
      <View style={{ flex: 3 }}>

        <View style={{
          height: 40, borderWidth: 1, borderColor: 'white', borderRadius: 4, width: '100%',
        }}>
        <Text>dsdadsa</Text>

      </View>
        <View style={{
          height: 40, borderWidth: 1, borderColor: 'white', borderRadius: 4, width: '100%',
        }}></View>
      </View>
      <View style={{ flex: 1, backgroundColor: 'grey' }}>
        <Text style={{ color: 'white' }}> From - destination block </Text>
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
            style={{ marginVertical: 10 }}
            data={this.props.data.plan.itineraries}
            renderItem={this.renderItem}
            keyExtractor={item => `index${item.walkDistance}`}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
          />

    );
  }
}

const styles = StyleSheet.create({
  containerBlocDepartDestination: {
    flexDirection: 'row',
    borderColor: '#000FA3',
    borderWidth: 0.5,
    backgroundColor: '#2352D7',
    elevation: -1,
    borderRadius: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
    marginHorizontal: 0,
    marginVertical: 5,
    minHeight: 80,
  },
  containerTextDepart: {
    flexDirection: 'row',
    borderColor: '#efefef',
    borderWidth: 1,
    backgroundColor: '#fbfbfb',
    elevation: 1,
    borderRadius: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
    marginHorizontal: 0,
    marginVertical: 5,
    minHeight: 80,
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
  directionText: {
    fontSize: 20,
    fontFamily: 'PTSans-Bold',
    color: '#B8C1C3',
  },
  directionText2: {
    fontSize: 14,
    fontFamily: 'PTSans-Bold',
    color: '#B8C1C3',
  },
});

export default ListRoutes;
