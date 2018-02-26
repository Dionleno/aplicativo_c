/**
 * Contem1g App
 * @Pagina Header Header Externo
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { Header, Button, Body, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import styleDefault from '../../StyleSheet/Buttons.js'

export default props => {
  const  { state } = props.item.navigation
  const title = props.title || 'Contém1g Magic';

  return (
    <Header androidStatusBarColor='#000000' style={{backgroundColor:'#333333'}}>
      <View style={styleDefault.boxBtnMenu}>
        <Button 
          transparent 
          onPress={() => {
            props.item.navigation.goBack()
          }}>
          <Icon name='keyboard-arrow-left' style={{fontSize:25,color:'#FFFFFF'}}/>
        </Button>
      </View> 
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  )
}