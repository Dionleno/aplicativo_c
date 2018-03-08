import React, { Component } from 'react';
import { Text, StatusBar, StyleSheet } from 'react-native';
import {Container, Header, Left, Button, Body, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { preto } from '../../StyleSheet/Cores';
import styles from './Style';
import MultPlatform from '../../MultPlatform'
export default class HeaderCheckout extends Component {

  constructor (props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Header androidStatusBarColor="#000000" iosStatusbar="light-content" style={{backgroundColor: MultPlatform.BackgroundColorStatusBar}}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name='keyboard-arrow-left' style={{fontSize:25,color: MultPlatform.TextColorStatusBar}}/>
          </Button>
        </Left>
        
        <Body>
          <Title>Checkout</Title>
        </Body>
        <Right />
      </Header>
    )
  }
}
