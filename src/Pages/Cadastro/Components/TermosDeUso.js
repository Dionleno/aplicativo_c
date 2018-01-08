/**
 *  Componente de cadastro
 */
 import React, { Component } from 'react';
 import { Platform ,TextInput} from 'react-native';
 import { View, Item, Input, Text, Button, Body,CheckBox,ListItem} from 'native-base';
 /*REDUX*/
 import { connect } from 'react-redux'
 import { bindActionCreators } from 'redux'
 import {onChangeFieldAddress,onChangeField} from '../Actions'  
 import ErrorForm from '../../../Helpers/ErrorForm'

 export class Endereco extends Component {
 	constructor(props) 
 	{
 		super(props);
 	}

 	render() 
 	{
    return (
 			<View>
			   <ListItem style={{backgroundColor:'transparent'}}>
				   <CheckBox checked={this.props.checked} onPress={() => this.props.onChangeField(!this.props.checked,'checked')} />
				   <Body>
				      <Text style={{fontSize:12}}>Li e concordo com os Termos e Condições de Credenciamento do Consultor</Text>
				   </Body>
			   </ListItem>
			   <ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.terms']}/>

			 
 			</View>
 			)
 	}
 }

 const mapStateToProps = state => (state.cadastro)
 const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldAddress,onChangeField},dispatch)
 export default connect(mapStateToProps,mapDispatchToProps)(Endereco)