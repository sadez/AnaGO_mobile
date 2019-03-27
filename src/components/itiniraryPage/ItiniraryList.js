import React, { Component } from 'react';
import {
  StyleSheet, View, FlatList, TextInput, Dimensions, TouchableOpacity,
} from 'react-native';
import { Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import WalkRoute from '../resultPage/routes/WalkRoute';

class ItiniraryList extends Component {
  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.minuteText}> {'18h30pm'} </Text>
            <WalkRoute
              distance={ Math.round(item.distance * 100 / 100)}
              isLast={true}
              />

        </View>
          <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: 'grey',
              }}
            />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.minuteText}> {'Marcher vers'} </Text>
            <Text style={styles.minuteText}> {'Rue la dordogne'} </Text>
            <Text style={styles.minuteText}> {'8 minutes'} </Text>
          </View>
          <Icon style={{
            fontSize: 18, color: 'grey',
          }} name="ios-arrow-forward" />

        </View>

      </View>
    </TouchableOpacity>

  );

  renderHeader = () => (
    <View style={styles.containerHeader}>
      <Text style={styles.textHeader}> You'll  arrive at 11:10pm </Text>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <Icon style={{
          fontSize: 18, color: 'grey',
        }} name="bookmark" />
        <Text style={{
          fontSize: 12, color: 'grey',
        }}> Save trip </Text>
      </TouchableOpacity>
     </View>

  );

  renderFooter = () => (
    <View>
    </View>

  );

  render() {
    const { legs } = this.props;

    return (
      <View style={{ height: '100%' }}>
          <FlatList
            data={legs}
            renderItem={this.renderItem}
            extraData={this.props.selectedRoute}
            keyExtractor={item => `index${item.distance}`}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    zIndex: 1,
    marginHorizontal: '10%',
  },
  minuteText: {
    fontSize: 14,
    fontFamily: 'PTSans-Regular',
    color: 'grey',
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
});

export default ItiniraryList;
