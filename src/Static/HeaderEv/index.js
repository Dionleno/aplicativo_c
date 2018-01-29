/**
 * Contem1g App
 * @Pagina Header Header Externo
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import {  Header, Left, Button, Body, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default props => {
    // const  { state } = props.item.navigation;
        
    return (
      <Header searchBar style={styles.header}>
        <StatusBar backgroundColor="#000000" />

        <Left>
          <Button 
            transparent 
            onPress={() => {
              props.item.navigation.navigate('DrawerOpenEv') 
            }}>
            <Icon name='menu' style={styles.icon}/>
          </Button>
        </Left>
        <Body>
          <Title>Escritório Virtual</Title>
        </Body>
        <Right />
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
