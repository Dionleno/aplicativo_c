/**
 *  Componente de cadastro
 */
 import React, { Component } from 'react';
 import { Platform ,TextInput,Animated,Linking,WebView} from 'react-native';
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
 		let url = 'https://ev.contem1gmagic.com.br/arquivos/termos_uso/contrato_consultor.pdf'
    return (
 			<View>
 
         
			   <ListItem style={{backgroundColor:'transparent'}} onPress={() => this.props.onChangeField(!this.props.checked,'checked')}>
				   <CheckBox color='black' checked={this.props.checked} onPress={() => this.props.onChangeField(!this.props.checked,'checked')} />
				   <Body>
				      <Text style={{fontSize:12}} onPress={() => { Linking.openURL(url).catch(err => console.error('An error occurred', err)); }}>
				          Li e concordo com os <Text style={{fontSize:12,fontWeight:'bold'}} >Termos e Condições de Credenciamento</Text> do Consultor
				       </Text>
				   </Body>
			   </ListItem>
			     <ListItem style={{backgroundColor:'transparent'}}>
			     <Body>
			         <ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['terms']}/>
			          </Body>
           </ListItem>
			 
 			</View>
 			)
 	}
 } 

 const mapStateToProps = state => (state.cadastro)
 const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldAddress,onChangeField},dispatch)
 export default connect(mapStateToProps,mapDispatchToProps)(TermosDeUso)