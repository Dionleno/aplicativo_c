import React, { Component } from 'react';
import { Text, StatusBar, StyleSheet } from 'react-native';
import {Container, Header, Left, Button, Body, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HeaderCheckout extends Component {

  constructor (props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Header style={styles.container}>  
        
        <StatusBar backgroundColor='#000000' />
        
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name='keyboard-arrow-left' style={styles.iconBack}/>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  iconBack: {
    fontSize:22, 
    color:'#FFFFFF'
  }
});
