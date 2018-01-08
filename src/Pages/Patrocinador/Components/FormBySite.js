
/**
 *  Componente para lista patrocinadores
 */
import React, { Component } from 'react';
import { Platform ,TextInput } from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Left, Thumbnail, Body} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {BuscarPatrocinador,onSelectedTypeSearch,onChangeField} from '../Actions'  
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text';
import StyleInput from '../../../StyleSheet/Input';

export const PatrocionadorBySite = props => {
    return (
		<View>  
			<Item style={[StyleInput.boxinput,{marginBottom:10, backgroundColor:'#f1f1f1'}]}> 
				<TextInput underlineColorAndroid='transparent'  style={StyleInput.inputText} placeholder='Minisite do seu patrocionador' value={props.findtext} onChangeText={(value) => props.onChangeField(value,'findtext')}/>
			</Item>

			<Button full style={{backgroundColor: "#000000"}} onPress={() => props.BuscarPatrocinador(props.findtext)}>
				<Icon name='search' style={{fontSize:25,color:'#FFFFFF'}} />
				<Text>Buscar Patrocionador</Text>
			</Button>
		</View>
    )
}

const mapStateToProps = state => (state.patrocionador)
const mapDispatchToProps = dispatch => bindActionCreators({BuscarPatrocinador,onSelectedTypeSearch,onChangeField},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(PatrocionadorBySite)