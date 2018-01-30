/**
 * Contem1g App
 * @Pagina Home
 * @flow
 */

import React, { Component } from 'react';

/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handlerLogin, onChangeField ,changeLoading_login } from './Actions';

/*NATIVE E NATIVE BASE*/
import { ImageBackground, View, TextInput } from 'react-native';
import { Container, Content, Item, Button, Text, Spinner } from 'native-base';
import styles from './Style';
import HeaderExterno from '../../Static/HeaderExterno';

/*Helpers*/
import IF from '../../Helpers/if'
import StyleInput from '../../StyleSheet/Input';

export class Login extends Component {
	
	constructor(props) {
		super(props);
	}
 
	btnLogin(){
		if(this.props.loading_login_app){
			return (<Spinner color='black' />);
		}

		return (
			<Button block style={[styles.btnPrimary,{marginTop:20}]} onPress={() => {this.props.handlerLogin(this.props)}}>
				<Text>Entrar</Text>
			</Button>
		);
	}
 
	componentWillUnmount() {
		console.log('passou aqui')
     this.props.changeLoading_login(false)
	}
 
 

  render() {
    return (
			<Container style={{backgroundColor:'#FFFFFF'}}>
			  <HeaderExterno item={this.props} title="Login" />
				
				<Content>
					<ImageBackground 
						style={{backgroundColor:'#000000',height:100}}
						source={require('../../Images/banner2.jpg')}>
						
						<View  style={styles.ContainerView} >  
							<Text style={styles.TitleH1}>Acesse sua conta</Text> 
						</View>
					</ImageBackground>

					<View style={{padding:20,backgroundColor:'#FFFFFF'}}>
						<TextInput 
							underlineColorAndroid='transparent'  
							style={[StyleInput.inputText, {marginBottom: 15}]} 
							placeholder='Login' 
							autoCapitalize='none'
							returnKeyType='next'
							value={this.props.form.login} 
							onChangeText={(value) => this.props.onChangeField(value,'login')}
						/>

						<TextInput 
							underlineColorAndroid='transparent'  
							style={StyleInput.inputText} 
							placeholder='Senha' 
							autoCapitalize='none'
							secureTextEntry={true} 
							value={this.props.form.senha}
							onSubmitEditing={() => this.props.handlerLogin(this.props)}
							onChangeText={(value) => this.props.onChangeField(value, 'senha')}
						/>
						
						{this.btnLogin()}

		     	</View>
				</Content>
			</Container>
    )
  }
}

 

const mapStateToProps = state => (state.login)
const mapDispatchToProps = dispatch => bindActionCreators({handlerLogin,onChangeField,changeLoading_login},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Login)
 