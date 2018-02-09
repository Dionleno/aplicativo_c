/**
 * Contem1g App
 * @Pagina Header Header Externo
 * @flow
 */

import React, { Component } from 'react';
import { Platform, AppRegistry, Text, StatusBar,TouchableHighlight,StyleSheet,View} from 'react-native';

import {Container,Header, Left, Button,Body,Title,Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import styleDefault from '../../StyleSheet/Buttons.js'

export default props =>{
    const  { state } = props.item.navigation
        
    return (
    	 
        <Header style={{backgroundColor:'#333333'}}>
          <StatusBar backgroundColor="#000000" />
          <View style={styleDefault.boxBtnMenu}>
            <Button transparent onPress={() => {
            	 props.item.navigation.goBack()
            }}>
              <Icon name='keyboard-arrow-left' style={{fontSize:25,color:'#FFFFFF'}}/>
            </Button>
          </View> 
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

