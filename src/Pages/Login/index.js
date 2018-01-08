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
<Container style={{backgroundColor:'#FFFFFF'}}>
			  <HeaderExterno item={this.props} title="Login" />
				<Content>
					
             <ImageBackground style={{backgroundColor:'#000000',height:100}}
                     source={require('../../Images/banner2.jpg')}>
               
                <View  style={styles.ContainerView} >  
                      <Text style={styles.TitleH1}>Acesse sua conta</Text> 
                 </View>
             
             </ImageBackground>
					{this.loading()}
				

					<Form style={{margin:20,backgroundColor:'#FFFFFF'}}>
		            	<Item floatingLabel>
		            		<Label>Login</Label>
		              		<Input value={this.state.form.login} onChangeText={(value) => {this.setState({form: {...this.state.form, login: value}})}} />
		            	</Item>
		            	<Item floatingLabel last>
		            		<Label>Senha</Label>
		              		<Input secureTextEntry={true}  value={this.state.form.senha} onChangeText={(value) => {this.setState({form: {...this.state.form, senha: value}})}} />
		            	</Item>

	            		<Button block style={[styles.btnPrimary,{marginTop:20}]} onPress={() => {this.doLogin()}}>
	            			<Text>Entrar</Text>
	            		</Button>
		          	</Form>
				</Content>
			</Container>

    )
  }
}


const mapStateToProps = state => (state.home)
export default connect(mapStateToProps)(Home)