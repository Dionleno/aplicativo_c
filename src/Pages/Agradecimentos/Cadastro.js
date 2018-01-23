/**
 * Contem1g App
 * @Pagina Agradecimento pelo cadastro
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,
	View,
	Image,
	Dimensions,StyleSheet,ImageBackground,
	FlatList,ScrollView,Alert,StatusBar,
	Linking
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadFinalizarCadastro } from '../Checkout/Actions';

import { Content, Text, Container, Item, Input, Thumbnail, H3, Label, Separator, Row, Button, Col, Grid, Left, Card, CheckBox, List, ListItem, Body, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stylesTemplate from '../../StyleSheet/Buttons';
import { _navigateTo } from '../../Helpers/Http';

class Cadastro extends Component {

	constructor(props){
		super(props);

		this.state = {
			codigo: '',
			boleto: ''
		};
	}

	componentWillMount(){
		const {response} = this.props.navigation.state.params;
		
		try {
			this.setState({codigo: response.id});
		} catch (error) { }

		try {
			this.setState({boleto: response.url});
		} catch (error) { }
	}

	openPDF(){
		Linking.openURL(this.state.boleto)
			.catch(error => {
				Alert.alert('Atenção', 'Ocorreu um erro ao gerar o Boleto, tente novamente mais tarde.');
				console.log(error);
			});
	}

	boleto(){
		if(this.state.boleto){
			return (
				<View style={{marginBottom: 15}}>
					<Button block style={stylesTemplate.btnPrimary} onPress={() => this.openPDF()}>
						<Text>Abrir boleto</Text>
					</Button>
				</View>
			);
		}
	}
	
	render() {

		return (
			<Container style={{backgroundColor:'#FFFFFF'}}>
				
				<Content style={{paddingBottom:20, paddingHorizontal: 15}}> 
					<View style={{padding:15,marginTop:25}}>
						<Button rounded  style={styles.btnOutline} >
							<Icon name='done' style={{fontSize:45,color:'#20CDA6'}} />
						</Button>
					</View>

					<View style={{alignItems: 'center', padding:15}}>
						<H3 style={styles.H3}>Seu pedido foi realizado</H3>
						<H3 style={styles.H3}>com sucesso!</H3>
					</View>

					<View style={{alignItems: 'center', padding:15}}>
						<Text>Parabéns, seu pedido já está </Text>
						<Text>sendo processado.</Text>
					</View>

					<View style={{alignItems: 'center', flex: 1, padding:15}}>
						<Text style={{marginBottom:10}}>Número do pedido</Text>
						<Button  style={[stylesTemplate.btnPrimaryOutline, {alignSelf: 'center'}]} >
							<Text style={{color:'#888888'}}>#{this.state.codigo}</Text>
						</Button>
					</View>

					{this.boleto()}

					<View >
						<Button block style={stylesTemplate.btnPrimary} onPress={() => _navigateTo(this.props, 'Home')}>
							<Text>Voltar para a tela inicial</Text>
						</Button>
					</View>
				</Content>
			</Container>
		)
	}
}  

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width  * 9 / 16);
const imageWidth = dimensions.width;
const styles = StyleSheet.create({
	H3: {
		color:'#20CDA6',  alignSelf: 'center',alignItems:'center',justifyContent: 'center',
	},
	ContainerView: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		width: dimensions.width,
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.65)',
		alignSelf: 'stretch',alignItems:'center',justifyContent: 'center',
	},
	ContainerMain: {
		paddingBottom:20,
		backgroundColor:'#FFFFFF'
	},
	TitleH1: {
		alignSelf:'flex-end',
		padding:5,
		paddingHorizontal:15,
		paddingBottom:0,
		color:'#FFFFFF',
		fontSize:16
	},
	TextSmall: {
		color:'#5c636a',
		fontSize:12
	},
	btnOutline: {
		width:100,
		height:100,
		backgroundColor: '#FFFFFF',
		borderRadius: 100,
		paddingHorizontal: 20,
		alignItems: 'center',
		borderWidth: 1.7,alignSelf: 'center',justifyContent: 'center',
		borderColor: '#20CDA6'
	}
});

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ loadFinalizarCadastro }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);