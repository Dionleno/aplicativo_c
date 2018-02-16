/**
 * Contem1g App
 * @Pagina Header Header Externo
 * @flow
 */

import React, { Component } from 'react';
import {  Platform, AppRegistry, Text, StatusBar, TouchableHighlight, StyleSheet, View } from 'react-native';

import {Container, Header, Left, Button, Body, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleDefault from '../../StyleSheet/Buttons'

export default props =>{
    const  { state } = props.item.navigation
        
    return (
      <Header style={styles.header}>
          <StatusBar backgroundColor="#000000" />

          <View style={styleDefault.boxBtnMenu}>
            <Button transparent onPress={ props.opendrawer}>
              <Icon name='menu' style={styles.icon}/>
            </Button>
          </View>
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
