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
import { Alert ,ImageBackground,View,Dimensions,StyleSheet} from 'react-native';
import {Container, Content, Form, Item, Input, Button, Text, Label, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Style'
import HeaderExterno from '../../Static/HeaderExterno'
import IF from '../../Helpers/if'


export class Login extends Component {
    
  render() {

    return (
<Container style={{backgroundColor:'#FFFFFF'}}>
			  <HeaderExterno item={this.props} title="Login" />
				<Content>
					
             <ImageBackground style={{backgroundColor:'#000000',height:100}}
                     source={require('../../Images/banner2.jpg')}>
               
                <View  style={styles.ContainerView} >  
                      <Text style={styles.TitleH1}>Acesse sua conta</Text> 
                 </View>
             
             </ImageBackground>

						<IF visible={this.props.loading}>
								<Spinner color='#000000' />
						</IF>
 
					<Form style={{margin:20,backgroundColor:'#FFFFFF'}}>
		            	<Item floatingLabel>
		            		<Label>Login</Label>
		              		<Input  />
		            	</Item>
		            	<Item floatingLabel last>
		            		<Label>Senha</Label>
		              		<Input secureTextEntry={true}  />
		            	</Item>

	            		<Button block style={[styles.btnPrimary,{marginTop:20}]}>
	            			<Text>Entrar</Text>
	            		</Button>
		          	</Form>
				</Content>
			</Container>

    )
  }
}


const mapStateToProps = state => (state.home)
export default connect(mapStateToProps)(Login)