import React, { Component } from 'react';
import {
  StyleSheet, View, FlatList, TouchableOpacity,
} from 'react-native';
import { Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import WalkRoute from '../resultPage/routes/WalkRoute';
import TransitRoute from '../resultPage/routes/TransitRoute';
import ItiniraryElement from './ItiniraryElement';

const decoPolyline = require('@mapbox/polyline');

class ItiniraryList extends Component {
  selectLeg(item) {
    this.props.selectLeg(item);
    this.props.navigation.navigate('MainDetailMap');
  }

  renderItem = ({ item, index }) => {
    const { legs } = this.props;
    const startTime = new Date(item.startTime);
    const startTimeParse = `${startTime.getHours()}:${startTime.getMinutes() < 10 ? '0' : ''}${startTime.getMinutes()}`;
    return (
     <TouchableOpacity style={styles.container} onPress={() => this.selectLeg(item)}>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
         <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'space-between' }}>
           <Text style={styles.addressText}>{startTimeParse}</Text>
         {
           (item.mode === 'WALK')
             ? <WalkRoute
             style={{ alignSelf: 'center' }}
             distance={ Math.round(item.distance * 100 / 100)}
             isLast={true}
             />
             : <TransitRoute
             style={{ top: 10 }}
             type={item.mode}
             routeName={item.routeShortName}
             isLast={true}
             />
         }

         </View>
         <ItiniraryElement isFirst={(index === 0)} isLast={(index === (legs.length - 1))} type={item.mode}/>
         <View style={{
           width: '40%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-end',
         }}>
           <View>
             {
               (item.mode === 'WALK')
                 ? <Text style={styles.directionText}> {'Marcher vers'} </Text>
                 : <Text style={styles.directionText}> {`Prendre ${item.mode} ${item.route}`} </Text>
             }

             {
               (item.mode === 'WALK')
                 ? <Text maxHeight={10} numberOfLines={1} style={[styles.addressText, { width: 110 }]}> {item.to.name} </Text>
                 : (item.intermediateStops.length > 0)
                   ? <Text maxHeight={5} numberOfLines={1} style={[styles.addressText, { width: 110 }]}> {`${item.intermediateStops.length} arrêts` } </Text> : null

             }
             {
               (item.mode !== 'WALK')
                 ? <React.Fragment>
                 <Text maxHeight={5} numberOfLines={1} style={[styles.directionText, { width: 110 }]}> {'Descendre à :'} </Text>
                 <Text maxHeight={5} numberOfLines={1} style={[styles.addressText, { width: 110 }]}> {`${item.to.name}`} </Text>
               </React.Fragment>
                 : null
             }
             <Text style={styles.directionText}>  {`(${Math.round(item.duration / 60)} min)`} </Text>
           </View>
           <Icon style={{
             marginLeft: 10, fontSize: 18, color: 'grey', alignSelf: 'center',
           }} name="ios-arrow-forward" />

         </View>

       </View>
     </TouchableOpacity>);
  };

  renderHeader = startTimeParse => (
    <View style={styles.containerHeader}>
      <Text style={styles.textHeader}> {` L'heure d'arrivée est :  ${startTimeParse} `}</Text>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <Icon style={{
          fontSize: 18, color: 'grey',
        }} name="bookmark" />
        <Text style={{
          fontSize: 12, color: 'grey',
        }}> Sauvegarder ce voyage</Text>
      </TouchableOpacity>
     </View>

  );

  renderFooter = endTimeParse => (
    <View style={{
      flexDirection: 'row', justifyContent: 'center', height: 45, marginHorizontal: '10%',
    }}>
      <View style={{
        width: '40%', flexDirection: 'row', justifyContent: 'flex-end',
      }}>
        <Text style={[styles.addressText, { color: '#2bc875' }]}>{endTimeParse}</Text>
      </View>
      <View style={{
        width: '20%',
      }}>
      </View>

      <View style={{
        width: '40%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-end',
      }}>
      <Text style={[styles.addressText, { color: '#2bc875' }]}>
        { `Arrivée à : ${this.props.legs[this.props.legs.length - 1].to.name}`}
      </Text>

        </View>
    </View>

  );

  render() {
    const {
      legs, startTimeParse, endTimeParse, selectPoly,
    } = this.props;

    const AllPolylinesReturn = [];
    for (let i = 0; i < legs.length; i += 1) {
      const polylinesReturn = [];
      if (legs[i].legGeometry) {
        const polylines = decoPolyline.decode(legs[i].legGeometry.points);
        for (let j = 0; j < polylines.length; j += 1) {
          polylinesReturn.push({ latitude: polylines[j][0], longitude: polylines[j][1] });
        }
        AllPolylinesReturn.push({ polyline: polylinesReturn, mode: legs[i].mode });
      }
    }

    selectPoly(AllPolylinesReturn);

    return (
      <View style={{ height: '75%' }}>
          <FlatList
            data={legs}
            contentContainerStyle={styles.containerDetailItinirary}
            renderItem={this.renderItem}
            extraData={this.props.selectedRoute}
            keyExtractor={item => `index${item.distance}`}
            ListHeaderComponent={this.renderHeader(startTimeParse)}
            ListFooterComponent={this.renderFooter(endTimeParse)}
            showsVerticalScrollIndicator={false}
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginHorizontal: '8%',

  },
  directionText: {
    fontSize: 12,
    fontFamily: 'PTSans-Regular',
    color: 'grey',
  },
  addressText: {
    maxHeight: 15,
    fontSize: 12,
    fontFamily: 'PTSans-Bold',
    color: 'grey',
    alignSelf: 'center',
  },
  containerHeader: {
    padding: 8,
    alignItems: 'center',
    zIndex: 1,
  },
  textHeader: {
    color: '#2bc875',
    fontFamily: 'PTSans-Bold',
    letterSpacing: 0.8,
    fontSize: 15,
  },
  containerDetailItinirary: {
    borderColor: '#efefef',
    borderWidth: 1,
    backgroundColor: '#fbfbfb',
    elevation: 1,
    borderRadius: 2,
    padding: 8,
    zIndex: 1,
    marginHorizontal: 0,
  },
});

const mapDispatchToProps = dispatch => ({
  selectLeg: payload => dispatch({ type: 'SELECT_LEG', payload }),
  selectPoly: payload => dispatch({ type: 'SELECT_POLY', payload }),
});

export default connect(null, mapDispatchToProps)(ItiniraryList);
