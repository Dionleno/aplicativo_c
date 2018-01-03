/**
 * Contem1g App
 * @Pagina Home
 * @flow
 */

import React, { Component } from 'react';

/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

/*NATIVE E NATIVE BASE*/
import { Platform, View, Image, Dimensions, Content, ImageBackground, StyleSheet, NetInfo} from 'react-native';
import { StyleProvider, Container, Button,Text,Header} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Style'

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width  * 9 / 16);
const imageWidth = dimensions.width;

export class Home extends Component {
    
  render() {

    return (

			<Container padder>

				<ImageBackground style={styles.BackgroundView} source={require('../../Images/banner2.jpg')}>

					<View  style={styles.ContainerView} >

						<View style={{flex: 1, justifyContent: 'center',alignItems:"center", flexDirection: 'column',margin:20,}} >

							<Image style={{ width: imageWidth -40, height: imageHeight,resizeMode: Image.resizeMode.contain}}
							       source={require('../../Images/logo.png')}
							/>

              <Text style={{color:'#000000',fontSize:18}}>
									Você fez a escolha certa.{'\n'}
									Seja bem-vindo (a)!
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


const mapStateToProps = state => (state.home)
export default connect(mapStateToProps)(Home)