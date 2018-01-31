/**
 * Contem1g App
 * @Pagina Aguardando
 * @flow
 */

import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Content, Text, Container, H3, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stylesTemplate from '../../StyleSheet/Buttons';
import { RequestAuth, _navigateTo } from '../../Helpers/Http';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

export default class Cadastro extends Component {

	constructor(props){
    super(props);
    
    this.state = {
      visible: true
    };
	}

	componentWillMount(){
    RequestAuth('users', 'GET')
      .then(response => response.json())
      .then(response => {
        this.setState({visible: false});
        if(response.data.status.id == 1){
          _navigateTo(this.props, 'DrawerEv');
        }
      })
      .catch(error => console.log(error));
  }
  
	render() {
		return (
			<Container style={{backgroundColor:'#FFFFFF'}}>
        <SpinnerOverlay visible={this.state.visible} textContent={"Aguarde..."} textStyle={{color: '#FFF'}} />
				<Content style={{paddingBottom:20, paddingHorizontal: 15}}> 
					<View style={{padding:15,marginTop:25}}>
						<Button rounded style={styles.btnOutline} >
							<Icon name='done' style={{fontSize:45,color:'#20CDA6'}} />
						</Button>
					</View>
				  <H3 style={styles.H3}>Seu pedido foi realizado e está sendo processado.</H3>
					<H3 style={styles.H3}>Estamos capturando o seu pagamento.</H3>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	H3: {
    color:'#20CDA6', 
    alignSelf: 'center',
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 25
	},
	btnOutline: {
		width:100,
		height:100,
		backgroundColor: '#FFFFFF',
		borderRadius: 100,
		paddingHorizontal: 20,
		alignItems: 'center',
    borderWidth: 1.7,
    alignSelf: 'center',
    justifyContent: 'center',
		borderColor: '#20CDA6'
	}
});