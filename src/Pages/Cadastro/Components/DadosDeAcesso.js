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
import {TextInputMask} from 'react-native-masked-text';
import {RequestGet} from '../../../Helpers/Http';

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
					<Grid>
						<Col style={{marginRight:3}}>
							<Item regular style={{backgroundColor:'#FFFFFF',height:50}}>
								<TextInput 
									style={styles.StyleInputText}
									underlineColorAndroid='transparent' 
									placeholder="Login"
									returnKeyType={'next'}
									onChangeText={(value) => this.props.onChangeFieldUser(value,'login')  }
								/>
							</Item>
							<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.login']}/>
						</Col>
					</Grid>

					<Item regular style={{backgroundColor:'#FFFFFF', height:50}}>
						<TextInput 
							style={styles.StyleInputText}
							underlineColorAndroid='transparent' 
							placeholder="E-mail"
							keyboardType='email-address'
							returnKeyType={'next'}
							onChangeText={(value) => this.props.onChangeFieldUser(value, 'email')}
						/>
					</Item>
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.email']}/>
					
					<Item regular style={{backgroundColor:'#FFFFFF', height:50}}>
						<TextInput 
							style={styles.StyleInputText}
							underlineColorAndroid='transparent' 
							placeholder="Confirmar e-mail" 
							keyboardType='email-address'
							returnKeyType={'next'}
							onBlur={() => this.props.verificarEmail()}
							onChangeText={(value) => this.props.onChangeFieldUser(value,'email_confirmation')}
						/>
					</Item>
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.email_confirmation']}/>

					<Item regular style={{backgroundColor:'#FFFFFF', height:50}}> 
						<TextInput 
							style={styles.StyleInputText}
							underlineColorAndroid='transparent' 
							secureTextEntry={true} 
							placeholder="Senha"
							returnKeyType={'next'}
							onChangeText={(value) => this.props.onChangeFieldUser(value,'password')}
						/>
					</Item>
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.password']}/>

					<Item regular style={{backgroundColor:'#FFFFFF', height:50, marginBottom: 10}}> 
						<TextInput 
							style={styles.StyleInputText}
							underlineColorAndroid='transparent' 
							secureTextEntry={true} 
							placeholder="Repetir senha"
							returnKeyType={'next'}
							onBlur={() => this.props.verificarSenha()}
							onChangeText={(value) => this.props.onChangeFieldUser(value,'password_confirmation')}
						/>
					</Item>

					<Item regular style={{backgroundColor:'#FFFFFF',marginBottom:8,height:50}}>
						<TextInput 
							style={styles.StyleInputText}
							underlineColorAndroid='transparent' 
							placeholder="Minisite"
							returnKeyType={'next'}
							onChangeText={(value) => this.props.onChangeFieldUser(value,'minisite')}
						/>
					</Item>
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.minisite']}/>
					
				</View>

			</View>
 		)
 	}
}

const mapStateToProps = state => (state.cadastro)
const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldUser, onChangeFieldPhone, onChangeField, verificarSenha, verificarEmail},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(DadosDeAcesso)