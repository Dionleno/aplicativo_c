/**
 * Contem1g App
 * @Pagina Thnakyout
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,
	View,
	Image,
	Dimensions,StyleSheet,ImageBackground,
	FlatList,ScrollView,Alert,StatusBar
} from 'react-native';

import { Content, Text, Container, Item, Input, Thumbnail, H3, Label, Separator, Row, Button, Col, Grid, Left, Card, CheckBox, List, ListItem, Body, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stylesButtons from '../../StyleSheet/Buttons';


export default class Thankyou extends Component {

	render() {

		return (
			<Container style={{backgroundColor:'#FFFFFF'}}>

				<Content style={{paddingBottom:20}}> 
					<View style={{padding:15,marginTop:25}}>
						<Button rounded  style={styles.btnOutline}>
							<Icon name='done' style={{fontSize:45,color:'#20CDA6'}} />
						</Button>
					</View>
					<View style={{alignItems: 'center',padding:15}}>
						<H3 style={styles.H3}>Cadastro efetuado</H3>
						<H3 style={styles.H3}>com sucesso!</H3>
					</View>
 
					<View style={{alignItems: 'center',padding:15}}>
						<Text>Parabéns fulano,</Text>
						<Text>você está próximo de se tornar</Text>
						<Text>um revendedor Contém 1g Magic.</Text>

						<Text style={{marginTop:20}}>Aguarde o e-mail </Text>
						<Text>com mais informações.</Text>
					</View>
 
					<View style={{padding:15,}}>
						<Button  style={[stylesButtons.btnPrimary, {alignSelf: 'center'}]}  onPress={() => this.props.navigation.navigate('Drawer') }>
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
