import React, { Component } from 'react';
import {
  StyleSheet, View, FlatList, TextInput, Dimensions,
} from 'react-native';
import { Accordion, Text, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Moment from 'react-moment';

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
              <React.Fragment key={i}>
                <View style={{ top: 10, alignItems: 'center' }}>
                    <Icon style={{ fontSize: 40, paddingHorizontal: 8, color: 'grey' }} name="ios-walk" />
                    <Text style={styles.directionText2}>{ Math.round(leg.distance * 100 / 100)}{' m'}</Text>
                </View>
                {(i !== item.legs.length - 1) ? <Text style={styles.directionText}>{'>'}</Text> : null }

              </React.Fragment>
            );
          }
          if (leg.mode === 'BUS') {
            return (
              <React.Fragment key={i}>
                <View style={{ top: 10, alignItems: 'center' }}>
                  <Icon style={{
                    fontSize: 30, paddingHorizontal: 8, paddingVertical: 3, color: 'white', backgroundColor: '#000FA3', borderRadius: 30 / 2,
                  }} name="md-bus" />
                  <Text style={styles.directionText2}>{'Bus '}{ leg.routeShortName}</Text>
                </View>

                {(i !== item.legs.length - 1) ? <Text style={styles.directionText}>{'>'}</Text> : null }
              </React.Fragment>);
          }
          if (leg.mode === 'TRAM') {
            return (
              <React.Fragment key={i}>
                <View style={{ top: 10, alignItems: 'center' }}>
                  <Icon style={{
                    fontSize: 30, paddingHorizontal: 8, paddingVertical: 3, color: 'white', backgroundColor: '#FDAE10', borderRadius: 18,
                  }} name="md-subway" />
                  <Text style={styles.directionText2}>{'Tram '}{ leg.routeShortName}</Text>
                </View>

                {(i !== item.legs.length - 1) ? <Text style={styles.directionText}>{'>'}</Text> : null }
              </React.Fragment>);
          }
          if (leg.mode === 'TRAIN') {
            return (
              <React.Fragment key={i}>
                <View style={{ top: 10, alignItems: 'center' }}>
                  <Icon style={{
                    fontSize: 30, paddingHorizontal: 8, paddingVertical: 3, color: 'white', backgroundColor: '#6D6049', borderRadius: 18,
                  }} name="md-train" />
                <Text style={styles.directionText2}>{'Train '}{ leg.routeShortName}</Text>
                </View>
                {(i !== item.legs.length - 1) ? <Text style={styles.directionText}>{'>'}</Text> : null }
              </React.Fragment>);
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
          if (leg.mode === 'GTAXI') {
            return (
              <React.Fragment key={i}>
                <Icon style={{
                  fontSize: 30, paddingHorizontal: 7, paddingVertical: 3, color: 'grey', backgroundColor: '#FEFEE2', borderRadius: 18, borderWidth: 1, borderColor: 'grey',
                }} name="md-car" />
                  {(i !== item.legs.length - 1) ? <Text style={styles.directionText}>{'>'}</Text> : null }
              </React.Fragment>);
          }
          return null;
        })
      }
      <View>
        <View style={{ backgroundColor: 'black' ,alignItems: 'center',}}>
          <Text style = {{ color: 'white', fontSize: 12 , fontFamily: 'PTSans-Bold',}}>{Math.round((item.fare.fare.regular.cents / 100) * 2) / 2} {'Dhs'}</Text>
        </View>
        <Text style={styles.timeText}> {Math.round(item.duration / 60)} </Text>
        <Text style={styles.minuteText}> {'Minutes'} </Text>
        {/* <Text style={styles.timeText}> {Math.round((item.fare.fare.regular.cents / 100) * 2) / 2} </Text>
        <Text style={styles.minuteText}> {'Dhs'} </Text> */}
      </View>

    </View>

  );

  renderHeader = () => (
    <View style={styles.containerTextDepart}>
     <Text> From - destination block </Text>
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
