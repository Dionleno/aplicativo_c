
/**
 *  Componente para lista patrocinadores
 */
import React, { Component } from 'react';
import { Platform, TextInput } from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Left, Thumbnail, Body} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BuscarPatrocinadorCep, onSelectedTypeSearch, onChangeField, requestCupom} from '../Actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StyleInput from '../../../StyleSheet/Input';
import stylesButtons from '../../../StyleSheet/Buttons';

export const PatrocionadorByCupom  = props => {
  return (
		<View style={{margin:10,flexDirection: 'row', flex: 1}}>  
							
			
				<TextInput style={[StyleInput.inputText]} 
					placeholder='Cupom de ativação?' 
					value={props.coupon} 
					returnKeyType="search"
					keyboardType='numeric'
					underlineColorAndroid='transparent' 
					onSubmitEditing={() => props.requestCupom(props._obj) }
					onChangeText={(value) => props.onChangeField(value,'coupon')}
				/>

			<Button 
				style={[stylesButtons.btnPrimary,{height: 48, width:50, borderRadius: 0,paddingHorizontal: 0,justifyContent: 'center'}]}
				onPress={() => props.requestCupom(props._obj)}>
				<Icon name='arrow-forward' style={{fontSize:25,color:'#FFFFFF', justifyContent: 'center'}} />
			</Button>
		</View>
  )
}

const mapStateToProps = state => (state.patrocionador)
const mapDispatchToProps = dispatch => bindActionCreators({BuscarPatrocinadorCep,onSelectedTypeSearch,onChangeField,requestCupom},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(PatrocionadorByCupom)