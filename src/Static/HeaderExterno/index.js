/**
 * Contem1g App
 * @Pagina Header Header Externo
 * @flow
 */

import React, { Component } from 'react';
import { Platform, AppRegistry, Text, StatusBar,TouchableHighlight,StyleSheet,View} from 'react-native';

import {Container,Header, Left, Button,Body,Title,Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
 

export default props =>{
    const  { state } = props.item.navigation
        
    return (
    	 
        <Header style={{backgroundColor:'#333333'}}>
          <StatusBar backgroundColor="#000000" />
          <Left>
            <Button transparent onPress={() => {
            	 props.item.navigation.goBack()
            }}>
              <Icon name='keyboard-arrow-left' style={{fontSize:25,color:'#FFFFFF'}}/>
            </Button>
          </Left> 
          <Body>
            <Title>{ props.title}</Title>
          </Body>
          <Right />
           
          
        </Header>
      
        
    )
  
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

