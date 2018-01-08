
/**
 *  Componente para lista patrocinadores
 */
import React, { Component } from 'react';
import { Platform,TextInput } from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Left, Thumbnail, Body} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {BuscarPatrocinadorCep,onSelectedTypeSearch,onChangeField} from '../Actions'  
import Icon from 'react-native-vector-icons/MaterialIcons'
 
import StyleInput from '../../../StyleSheet/Input';

export const PatrocionadorByCupom  = props => {
    return (

    	<View style={{margin:10,backgroundColor:'#FFFFFF',padding:15,paddingVertical:8, borderRadius:5}}>  
							<Text>
									Possui um cupom de ativação?
							</Text>
							 
						</View>
 
    )
}

const mapStateToProps = state => (state.patrocionador)
const mapDispatchToProps = dispatch => bindActionCreators({BuscarPatrocinadorCep,onSelectedTypeSearch,onChangeField},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(PatrocionadorByCupom)