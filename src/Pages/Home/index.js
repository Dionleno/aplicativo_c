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
import { View, Image, Dimensions, ImageBackground, StyleSheet,AsyncStorage} from 'react-native';
import { Container, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { changeLoading_login } from '../Login/Actions';
import styles from './Style'
import { USER_INFO} from '../../Helpers/Constants';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width  * 9 / 16);
const imageWidth = dimensions.width;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.isLogin()
  }

  isLogin = async() => {
  	const Userinfo = await AsyncStorage.getItem(USER_INFO);
  	console.log(Userinfo)
  	if (Userinfo) {
  		setTimeout(() => {
  			 this.props.changeLoading_login(true)
  		   this.props.navigation.navigate('Logado')
  		}, 500)
  		
  	}else{
  		 this.props.changeLoading_login(false)
  	}
  }


  render() {

    return (

			<Container padder>

        <SpinnerOverlay visible={this.props.login.loading_login_app} 
                        overlayColor="rgba(255, 255, 255, 1)" 
                        textContent={"Aguarde..."} 
                        color="#000" 
                        textStyle={{color: '#000'}} />

				
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

							<Button block dark style={{marginTop:30}} onPress={() => this.props.navigation.navigate('Login')}>
								<Icon name='lock-outline' style={{fontSize:25,color:'#FFFFFF'}} />
								<Text>Log In</Text>
							</Button>

							<Button block dark style={{marginTop:30}} onPress={() => this.props.navigation.navigate('Patrocinador')}>
								<Icon name='group' style={{fontSize:25,color:'#FFFFFF'}} />
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
const mapDispatchToProps = dispatch => bindActionCreators({changeLoading_login},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Home)