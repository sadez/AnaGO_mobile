import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Accordion, Text, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Moment from 'react-moment';

class DetailAccordion extends Component {
  _renderHeader(item, expanded) {
    return (
     <View style={{
       flexDirection: 'row',
       padding: 10,
       alignItems: 'center',
       backgroundColor: '#A9DAD6',
     }}>
       <Moment style={{ fontSize: 10 }} format="HH:mm" unix element={Text} >{item.startTime}</Moment>

     <Grid style = {{ paddingHorizontal: 0 }}>
       {
   item.legs.map((leg, i) => {
     if (leg.mode !== 'WALK') {
       return (
         <Col key={i} style={{ paddingLeft: 2 }}>
           <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '600', paddingRight: 10, alignItems: 'center' }}>
                {leg.route}
              </Text>
              <Icon style={{ fontSize: 25 }} name="ios-car" />
            </View>
             <View style={styles.rectangle} />
          </View>
        </Col>);
     }
     return (null);
   })
 }

        </Grid>

     <Moment style={{ fontSize: 10, paddingHorizontal: 8 }} format="HH:mm" unix element={Text} >{item.endTime}</Moment>

     <View style={{ paddingHorizontal: 10 }}>
       <Text style={{ fontSize: 10 }}>
         {Math.round(item.duration / 60)}{' min'}
       </Text>
       <Text style={{ fontSize: 10 }}>
         { Math.round((item.fare.fare.regular.cents / 100) * 2) / 2 }{' Dhs'}
       </Text>
     </View>

       {expanded
         ? <Icon style={{ fontSize: 18, paddingHorizontal: 8 }} name="ios-arrow-up" />
         : <Icon style={{ fontSize: 18, paddingHorizontal: 8 }} name="ios-arrow-down" />}
     </View>
    );
  }

  _renderContent(i) {
    const _renderItem = ({ item }) => (
      <View style = {{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center',
      }}>

        <View style = {{ width: '20%' }}>
          <Moment style={{ fontSize: 10, paddingHorizontal: 8 }} format="HH:mm" unix element={Text} >{item.startTime}</Moment>
          <Icon style={{ fontSize: 18, paddingHorizontal: 8 }} name="md-walk" />
        </View>
        <View style = {{ width: '10%' }}>
          <Icon style={{ fontSize: 18, paddingHorizontal: 8 }} name="md-pin" />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
        <View style = {{ width: '60%', backgroundColor: 'grey' }}>
          <Text>{item.mode}</Text>
        </View>
        <View style = {{ width: '10%', backgroundColor: 'blue' }}><Text>{item.mode}</Text></View>

      </View>

    );

    return (
        <FlatList
          data={i.legs}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item.legGeometry.points}
        />
    );
  }

  render() {
    return (
        <Accordion
          dataArray={this.props.data.plan.itineraries}
          expanded={0}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          />
    );
  }
}

const styles = StyleSheet.create({
  rectangle: {
    width: '100%',
    height: 5,
    backgroundColor: 'red',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: 'grey',
  },
});

export default DetailAccordion;
