/**
 * Contem1g App
 * @Pagina Header Header Externo
 * @flow
 */

import React, { Component } from 'react';
import {  Platform, AppRegistry, Text, StatusBar, TouchableHighlight, StyleSheet, View } from 'react-native';

import {Container, Header, Left, Button, Body, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
 

export default props =>{
    const  { state } = props.item.navigation
        
    return (
      <Header searchBar style={styles.header}>
          <StatusBar backgroundColor="#000000" />

          <Left>
            <Button transparent onPress={ () => {  props.item.navigation.navigate('DrawerOpen'); }}>
              <Icon name='menu' style={styles.icon}/>
            </Button>
          </Left>
          <Body>
            <Title>{ props.title }</Title>
          </Body>
          <Right>
            <Button transparent onPress={ () => { props.item.navigation.navigate('Carrinho'); }}>
              <Icon name='shopping-cart' style={styles.icon} />
            </Button>
          </Right>
        </Header>
         
    )
  
} 

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333333',
  },
  icon: {
    fontSize:22,
    color:'#FFFFFF'
  }
});
