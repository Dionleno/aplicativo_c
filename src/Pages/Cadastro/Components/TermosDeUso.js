/**
 *  Componente de cadastro
 */
 import React, { Component } from 'react';
 import { Platform ,TextInput,Animated} from 'react-native';
 import { View, Item, Input, Text, Button, Body,CheckBox,ListItem,Content} from 'native-base';
 /*REDUX*/
 import { connect } from 'react-redux'
 import { bindActionCreators } from 'redux'
 import {onChangeFieldAddress,onChangeField} from '../Actions'  
 import ErrorForm from '../../../Helpers/ErrorForm'



 export class TermosDeUso extends Component {
 	constructor(props) 
 	{
 		super(props);
 	}

 	render() 
 	{
    return (
 			<View>
 
			   <ListItem style={{backgroundColor:'transparent'}}>
				   <CheckBox color='black' checked={this.props.checked} onPress={() => this.props.onChangeField(!this.props.checked,'checked')} />
				   <Body>
				      <Text style={{fontSize:12}} onPress={() => { this.props._props.popupDialog.show(); }}>
				          Li e concordo com os Termos e Condições de Credenciamento do Consultor
				       </Text>
				   </Body>
			   </ListItem>
			   <ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.terms']}/>

			 
 			</View>
 			)
 	}
 }

 const mapStateToProps = state => (state.cadastro)
 const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldAddress,onChangeField},dispatch)
 export default connect(mapStateToProps,mapDispatchToProps)(TermosDeUso)