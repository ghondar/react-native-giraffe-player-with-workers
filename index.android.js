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
  TouchableHighlight
} from 'react-native';
import { Worker } from 'rn-workers';

import GPlayer from 'react-native-giraffe-player'

class giraffeTestReact extends Component {

  componentWillMount() {
    GPlayer.addEventListener('onRenderingStart', this.onRenderingStart);
    GPlayer.setTitle('hola mundo')
  }

  componentWillUnmount() {
    GPlayer.removeEventListener('onRenderingStart', this.onRenderingStart);
  }

  onRenderingStart() {
    GPlayer.getDuration()
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    // interval 1 sec to show current position - worker at index.worker.js
    this.worker = new Worker();
    this.worker.postMessage("start");
    this.worker.onmessage = async message => {
      if(message == 'position') {
        const position = await GPlayer.getCurrentPosition()
        console.log(position)
      }
    }
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
