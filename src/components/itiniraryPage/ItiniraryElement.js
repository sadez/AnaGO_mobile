import React, { Component } from 'react';
import {
  StyleSheet, View,
} from 'react-native';

class ItiniraryElement extends Component {
  renderSwitch(param) {
    switch (param) {
      case 'BUS':
        return (
          <View style={styles.container}>
            {
              this.props.isFirst ? <View style={[styles.circleHoleFirst, { borderColor: '#000FA3' }]} />
                : <View style={[styles.circle, { backgroundColor: '#000FA3' }]} />
            }
            <View style={[styles.line, { borderLeftColor: '#000FA3' }]} />
            {
              this.props.isLast ? <View style={[styles.circleHole, { borderColor: '#2bc875' }]} />
                : null
            }
        </View>);
      case 'TRAM':
        return (<View style={styles.container}>
          {
            this.props.isFirst ? <View style={[styles.circleHoleFirst, { borderColor: '#FDAE10' }]} />
              : <View style={[styles.circle, { backgroundColor: '#FDAE10' }]} />
          }
          <View style={[styles.line, { borderLeftColor: '#FDAE10' }]} />
            {
              this.props.isLast ? <View style={[styles.circleHole, { borderColor: '#2bc875' }]} />
                : null
            }
        </View>);
      case ('RAIL'):
        return (<View style={styles.container}>
            {
              this.props.isFirst ? <View style={[styles.circleHoleFirst, { borderColor: '#6D6049' }]} />
                : <View style={[styles.circle, { backgroundColor: '#6D6049' }]} />
            }
          <View style={[styles.line, { borderLeftColor: '#6D6049' }]} />
            {
              this.props.isLast ? <View style={[styles.circleHole, { borderColor: '#2bc875' }]} />
                : null
            }
        </View>);
      case 'GTAXI':
        return (<View style={styles.container}>
          {
            this.props.isFirst ? <View style={[styles.circleHoleFirst, { borderColor: 'grey' }]} />
              : <View style={[styles.circle, { backgroundColor: 'grey' }]} />
          }
          <View style={[styles.line, { borderLeftColor: 'grey' }]} />
            {
              this.props.isLast ? <View style={[styles.circleHole, { borderColor: '#2bc875' }]} />
                : null
            }
        </View>);
      case 'TAXI':
        return (<View style={styles.container}>
          {
            this.props.isFirst ? <View style={[styles.circleHoleFirst, { borderColor: '#8B0000' }]} />
              : <View style={[styles.circle, { backgroundColor: '#8B0000' }]} />
          }
          <View style={[styles.line, { borderLeftColor: '#8B0000' }]} />
            {
              this.props.isLast ? <View style={[styles.circleHole, { borderColor: '#2bc875' }]} />
                : null
            }
        </View>);
      case 'WALK':
        return (<View style={styles.container}>
          {
            this.props.isFirst ? <View style={[styles.circleHoleFirst, { borderColor: 'grey' }]} />
              : <View style={[styles.circle, { backgroundColor: 'grey' }]} />
          }
          <View style={[styles.line, { borderLeftColor: 'grey' }]} />
            {
              this.props.isLast ? <View style={[styles.circleHole, { borderColor: '#2bc875' }]} />
                : null
            }
        </View>);
      default:
        return null;
    }
  }

  render() {
    return (
      this.renderSwitch(this.props.type)
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 35,
  },
  line: {
    borderLeftWidth: 2.5,
    height: 80,
    marginTop: -25,
    borderRadius: 5,
  },
  circle: {
    width: 10,
    top: -25,
    height: 10,
    borderRadius: 5,
  },
  circleHole: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  circleHoleFirst: {
    width: 10,
    height: 10,
    top: -25,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'white',
  },
});

export default ItiniraryElement;
