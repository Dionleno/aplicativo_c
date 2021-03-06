/**
 * Contem1g App
 * @Pagina Home
 * @flow
 */

import React, { Component } from 'react';

/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
/*NATIVE E NATIVE BASE*/
import { View, Image, Dimensions, ImageBackground, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { changeLoadingLogado } from '../Login/Actions';
import { _navigateTo } from '../../Helpers/Http';
import styles from './Style';
import buttons from '../../StyleSheet/Buttons';
import { USER_INFO} from '../../Helpers/Constants';
import { branco } from '../../StyleSheet/Cores';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width  * 9 / 16);
const imageWidth = dimensions.width;

export class Home extends Component {
  constructor(props) {
    super(props);
  }
componentDidMount = () =>{
	this.props.changeLoadingLogado(false)
}
  isLogin = async() => {
  	const Userinfo = await AsyncStorage.getItem(USER_INFO);
  	if (Userinfo) {
  		setTimeout(() => {
			   this.props.changeLoadingLogado(true)
			   _navigateTo( this.props, 'Logado') 
  		}, 700)
  		
  	}else{
  		 this.props.changeLoadingLogado(false)
  	}
  }


  render() {

    return (

			<Container padder>
 
<SpinnerOverlay 
					visible={this.props.login.loading_login_logado} 
					overlayColor="rgba(255, 255, 255, 1)" 
					textContent={"Aguarde..."} 
					color="#000" 
					textStyle={{color: '#000'}}
				/>
 
				

				<ImageBackground style={styles.BackgroundView} source={require('../../Images/banner2.jpg')}>

					<View  style={styles.ContainerView} >

						<View style={{flex: 1, justifyContent: 'center',alignItems:"center", flexDirection: 'column',margin:20,}} >

							<Image 
								style={{ width: imageWidth -40, height: imageHeight,resizeMode: Image.resizeMode.contain}}
								source={require('../../Images/logo.png')}
							/>

							<Text style={{color:'#000000',fontSize:18, textAlign: 'center'}}>
								Você fez a escolha certa.{'\n'}
								Seja bem-vindo(a)!
							</Text>

							<Button 
								block 
								iconLeft
								style={[buttons.btnPreto, {marginTop: 30}]} 
								onPress={() => this.props.navigation.navigate('Login')}>
								<Icon style={{color: branco, fontSize: 23}} name='lock-outline' />
								<Text style={buttons.btnPretoText}>Log In</Text>
							</Button>

							<Button 
								block 
								style={[buttons.btnPreto, {marginTop:30}]} 
								onPress={() => this.props.navigation.navigate('Patrocinador')}>
								<Icon name='group' style={{fontSize:25, color:'#FFFFFF'}} />
								<Text>Cadastre-se</Text>
							</Button>

						</View>

					</View>

				</ImageBackground>
			</Container>

    )
  }
}


const mapStateToProps = state => (state)
const mapDispatchToProps = dispatch => bindActionCreators({changeLoadingLogado},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Home)