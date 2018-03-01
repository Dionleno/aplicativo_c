/**
 * Contem1g App
 * @Pagina Home
 * @flow
 */

import React, { Component } from 'react';

/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handlerLogin, onChangeField ,changeLoading } from './Actions';

/*NATIVE E NATIVE BASE*/
import { ImageBackground, View, TextInput } from 'react-native';
import { Container, Content, Item, Button, Text, Spinner, Icon } from 'native-base';
import styles from './Style';
import button from '../../StyleSheet/Buttons';
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
			<Button 
				block 
				iconLeft
				style={button.btnPreto} 
				onPress={() => {this.props.handlerLogin(this.props)}}>
				<Icon name='md-lock' />
				<Text>Entrar</Text>
			</Button>
		);
	}
 
	componentWillUnmount() {
    this.props.changeLoading(false);
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
						
						<View style={{marginVertical: 15}}>
							{this.btnLogin()}

							<Button 
								block 
								iconLeft
								style={[button.btnPretoOutline, {marginTop: 15}]} 
								onPress={() => {this.props.navigation.navigate('Patrocinador')}}>
								<Icon style={button.btnPretoOutlineText} name='md-person-add' />
								<Text style={button.btnPretoOutlineText}>Quero ser um(a) consultor(a)</Text>
							</Button>
						</View>

		     	</View>
				</Content>
			</Container>
    )
  }
}

const mapStateToProps = state => (state.login)
const mapDispatchToProps = dispatch => bindActionCreators({handlerLogin,onChangeField,changeLoading},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Login);