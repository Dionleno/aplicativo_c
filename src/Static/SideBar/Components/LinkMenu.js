import React, { Component } from 'react';
import { withNavigation , NavigationActions } from 'react-navigation'
import { AppRegistry, View, Image, FlatList, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { ListItem, Body, Left, Right, Row, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'


export const LinkMenu = props => {
    
    return (
        <ListItem itemDivider onPress={() => props.navigation.navigate('Categorias', {categoria:props.name}) }>
          <Body>
            <Text>{props.name.name}</Text>
          </Body>
        </ListItem> 
    )
}

export default withNavigation(LinkMenu)
 