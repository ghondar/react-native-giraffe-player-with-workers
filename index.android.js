/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AppState
} from 'react-native';
import GPlayer from 'react-native-giraffe-player'
import BackgroundTimer from 'react-native-background-timer'

class giraffeTestReact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appState: '',
      intervalId: 0
    }
  }

  componentWillMount() {
    GPlayer.addEventListener('onRenderingStart', this.onRenderingStart.bind(this));
    AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    GPlayer.setTitle('hola mundo')
  }

  componentWillUnmount() {
    GPlayer.removeEventListener('onRenderingStart', this.onRenderingStart);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      BackgroundTimer.clearInterval(this.state.intervalId);
    }
    this.setState({
      appState: nextAppState
    });
  }

  onRenderingStart() {
    this.setState({
      intervalId: BackgroundTimer.setInterval(async () => {
        const position = await GPlayer.getCurrentPosition()
        console.log(position)
      }, 1000)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight onPress={() => { GPlayer.play('http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8'); }}>
          <Text>
            Play Video!!
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('giraffeTestReact', () => giraffeTestReact);
