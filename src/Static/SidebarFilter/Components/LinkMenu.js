import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeItem } from '../../../Pages/Produto/Actions'
import { AppRegistry, View, Image, FlatList, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { ListItem, Body, Left, Right, Row, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'


export const LinkMenu = props => {
    
    return (
        <ListItem itemDivider onPress={() => props.changeItem("_slug",props.name.slug) }>
          <Body>
            <Text>{props.name.name}</Text>
          </Body>
        </ListItem> 
    )
}

const mapStateToProps = state => (state.produto)
const mapDispatchToProps = dispatch => bindActionCreators({ changeItem }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(LinkMenu)  
 