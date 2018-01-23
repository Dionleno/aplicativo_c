
/**
 *  Componente para lista patrocinadores
 */
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Left, Thumbnail, Body} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {BuscarPatrocinadorCep,onSelectedTypeSearch,onChangeField} from '../Actions'  
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text';
import StyleInput from '../../../StyleSheet/Input';

export const PatrocionadorByCep  = props => {
    return (
		<View>  
			<Item style={[StyleInput.boxinput,{marginBottom:10, backgroundColor:'#f1f1f1'}]}>
				<TextInputMask 
					style={StyleInput.inputText}
					type={'zip-code'}
					underlineColorAndroid='transparent' 
					placeholder="Informe o seu CEP" 
					keyboardType='numeric' 
					value={props.findtextcep} 
					onChangeText={(value) => props.onChangeField(value,'findtextcep')} 
					onBlur={() => props.BuscarPatrocinadorCep()}
					returnKeyType='search'
					maxLength={9}
				/>
			</Item>
			<Button full style={{backgroundColor: "#000000"}} onPress={() => props.BuscarPatrocinadorCep()}>
				<Icon name='location-on' style={{fontSize:20,color:'#FFFFFF'}} />   
				<Text>Encontrar endereço</Text>
			</Button>
		</View>
    )
}

const mapStateToProps = state => (state.patrocionador)
const mapDispatchToProps = dispatch => bindActionCreators({BuscarPatrocinadorCep,onSelectedTypeSearch,onChangeField},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(PatrocionadorByCep)