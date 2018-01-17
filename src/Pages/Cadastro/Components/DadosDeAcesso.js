/**
 *  Componente de cadastro
 */
import React, { Component } from 'react';
import { Platform ,TextInput} from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Row,Left, Thumbnail, Body,Grid,Col,Picker} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {onChangeFieldUser, onChangeFieldPhone, onChangeField, verificarSenha, verificarEmail} from '../Actions' ; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../Style';
import ErrorForm from '../../../Helpers/ErrorForm';
import styleInput from '../../../StyleSheet/Input';

export class DadosDeAcesso extends Component {
	
	constructor(props) {
 		super(props);
	}
	 
 	render() {
		
 		return (
 			<View>
	 			<Row style={styles.title} >
		 			<Text style={styles.titleText}>Dados de acesso</Text>
		 			<Icon style={styles.titleIconArrowDown} name='keyboard-arrow-down' />
	 			</Row>

				<View style={{paddingRight:15,paddingLeft:15,paddingVertical:20}}>
					
					<TextInput 
						style={styleInput.inputText}
						underlineColorAndroid='transparent' 
						placeholder="Login"
						returnKeyType={'next'}
						onChangeText={(value) => this.props.onChangeFieldUser(value,'login')  }
					/>

					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.login']}/>

					<TextInput 
						style={styleInput.inputText}
						underlineColorAndroid='transparent' 
						placeholder="E-mail"
						keyboardType='email-address'
						returnKeyType={'next'}
						onChangeText={(value) => this.props.onChangeFieldUser(value, 'email')}
					/>
						
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.email']}/>
						
					<TextInput 
						style={styleInput.inputText}
						underlineColorAndroid='transparent' 
						placeholder="Confirmar e-mail" 
						keyboardType='email-address'
						returnKeyType={'next'}
						onBlur={() => this.props.verificarEmail()}
						onChangeText={(value) => this.props.onChangeFieldUser(value,'email_confirmation')}
					/>
						
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.email_confirmation']}/>

					<TextInput 
						style={styleInput.inputText}
						underlineColorAndroid='transparent' 
						secureTextEntry={true} 
						placeholder="Senha"
						returnKeyType={'next'}
						onChangeText={(value) => this.props.onChangeFieldUser(value,'password')}
					/>
					
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.password']}/>

					<TextInput 
						style={styleInput.inputText}
						underlineColorAndroid='transparent' 
						secureTextEntry={true} 
						placeholder="Repetir senha"
						returnKeyType={'next'}
						onBlur={() => this.props.verificarSenha()}
						onChangeText={(value) => this.props.onChangeFieldUser(value,'password_confirmation')}
					/>
					
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.password']}/>

					<TextInput 
						style={styleInput.inputText}
						underlineColorAndroid='transparent' 
						placeholder="Minisite"
						returnKeyType={'next'}
						onChangeText={(value) => this.props.onChangeFieldUser(value,'minisite')}
					/>
					
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.minisite']}/>
					
				</View>

			</View>
 		)
 	}
}

const mapStateToProps = state => (state.cadastro)
const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldUser, onChangeFieldPhone, onChangeField, verificarSenha, verificarEmail},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(DadosDeAcesso)