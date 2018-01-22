
/**
 *  Componente para lista patrocinadores
 */
import React, { Component } from 'react';
import { Platform, TextInput } from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Left, Thumbnail, Body,Row} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {onChangeField,requestCupom} from '../Actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StyleInput from '../../../StyleSheet/Input';
import stylesButtons from '../../../StyleSheet/Buttons';
import styles from '../Style';
export const PatrocionadorByCupom  = props => {
  return (
   <View>
	  	 <Row style={styles.title} >
						<Text style={styles.titleText}>Cupom de ativação</Text>
						<Icon style={styles.titleIconArrowDown} name='keyboard-arrow-down' />
			 </Row>
			<View style={{margin:10}}>  
				  	<TextInput style={props.coupon_ativo ? [StyleInput.inputTextCadastro,{borderColor:'#20CDA6'}] : [StyleInput.inputTextCadastro]} 
						placeholder='Cupom de ativação?' 
						value={props.coupon} 
						returnKeyType="search"
						keyboardType='numeric'
						underlineColorAndroid='transparent' 
						onSubmitEditing={() => props.requestCupom() }
						onBlur={() => props.requestCupom()}
						onChangeText={(value) => props.onChangeField(value,'coupon')}
					/>
	  
			</View>
	 </View>
  )
}

const mapStateToProps = state => (state.cadastro)
const mapDispatchToProps = dispatch => bindActionCreators({onChangeField,requestCupom},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(PatrocionadorByCupom)