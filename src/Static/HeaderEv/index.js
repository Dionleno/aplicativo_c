/**
 * Contem1g App
 * @Pagina Header Header Externo
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import {  Header, Left, Button, Body, Title, Right,View} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleDefault from '../../StyleSheet/Buttons.js';
import MultPlatform from '../../MultPlatform'
export default props => {
  let title = props.title || 'Escritório Virtual';

  return (
    <Header searchBar androidStatusBarColor="#000000" iosStatusbar="light-content" style={{backgroundColor: MultPlatform.BackgroundColorStatusBar}}>
      <View style={styleDefault.boxBtnMenu}>
        <Button 
          transparent 
          onPress={ props.opendrawer}>
          <Icon name='menu' style={[styles.icon,{color:MultPlatform.TextColorStatusBar}]}/>
        </Button>
      </View>
      <Body >
        <Title>{title}</Title>
      </Body>
        <Right>
          <Button transparent onPress={ () => { props.item.navigation.navigate('Carrinho'); }}>
            <Icon name='notifications' style={[styles.icon,{color:MultPlatform.TextColorStatusBar}]} />
          </Button>
            <Button transparent onPress={ () => { props.item.navigation.navigate('Carrinho'); }}>
            <Icon name='shopping-cart' style={[styles.icon,{color:MultPlatform.TextColorStatusBar}]} />
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
