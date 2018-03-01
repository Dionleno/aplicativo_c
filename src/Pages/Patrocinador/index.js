/**
*  Pagina para selecionar o patrocinador
*/
import React, { Component } from 'react';

/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ScrollView, FlatList } from 'react-native';
import { View, Text, H3, Button, Grid, Col, Spinner, List} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderExterno from '../../Static/HeaderExterno';

/*Componentes*/
import IF from '../../Helpers/if';
import PatrocionadorBySite from './Components/FormBySite';
import PatrocionadorByCep from './Components/FormByCep'; 
import ListPatrocinador from './Components/Lists';
import buttons from '../../StyleSheet/Buttons';
import { onSelectedTypeSearch, onChangeField } from './Actions';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

export class Patrocionador extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
    const { navigate } = this.props.navigation;
			return ( 
				<ScrollView style={{paddingBottom:20}}>
					<HeaderExterno item={this.props} title="Patrocinador" />

					{/* <PatrocionadorByCupom /> */}

					<View style={{margin:10,backgroundColor:'#FFFFFF',padding:15,borderRadius:5}}>  
						<Text style={{marginBottom:15,color:'#888888' }}>
							Já tem um patrocionador? 
						</Text>

						<Grid style={{marginBottom:20}}>
							<Col style={{marginRight: 5}}>
								<Button 
									block  
									iconLeft
									style={this.props.typeForm ? buttons.btnPrimary : buttons.btnPrimaryOutline} 
									onPress={() => {this.props.onSelectedTypeSearch(true)}}>
										<Icon name='thumb-up' style={[this.props.typeForm ? buttons.btnPrimaryText : buttons.btnPrimaryOutlineText, {fontSize:20}]} />       
										<Text style={this.props.typeForm ? buttons.btnPrimaryText : buttons.btnPrimaryOutlineText}>Sim</Text>
								</Button>
							</Col>
							<Col style={{marginLeft: 5}}>
								<Button 
									block
									iconLeft 
									style={!this.props.typeForm ? buttons.btnPrimary : buttons.btnPrimaryOutline} 
									onPress={() => { this.props.onSelectedTypeSearch(false)}} >
										<Icon name='thumb-down' style={[this.props.typeForm ? buttons.btnPrimaryOutlineText : buttons.btnPrimaryText, {fontSize:20}]} />    
										<Text style={this.props.typeForm ? buttons.btnPrimaryOutlineText : buttons.btnPrimaryText}>Não</Text>
								</Button>
							</Col>
						</Grid>

						<IF visible={this.props.typeForm}>
							<PatrocionadorBySite />
						</IF>

						<IF visible={!this.props.typeForm}>
							<PatrocionadorByCep />
						</IF>
					</View>

					<IF visible={this.props.showLoader}>
						<Spinner color='#000000' />
					</IF>

					<IF visible={this.props.user.length > 0}>
							<Text style={{margin:15}}>Lista de patrocinadores</Text>
							<List>
									<FlatList
										data={this.props.user}
										keyExtractor={(item, index) => index} 
										renderItem={({item, id, index}) => (
											<ListPatrocinador item={item} _obj={this.props}/>
										)}
									/>
							</List>
					</IF>
					
					<SpinnerOverlay visible={this.props.overlay} textContent={"Aguarde..."} textStyle={{color: '#FFF'}} />

				</ScrollView>
			)
	}
}

const mapStateToProps = state => (state.patrocionador);
const mapDispatchToProps = dispatch => bindActionCreators({onSelectedTypeSearch, onChangeField},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Patrocionador)