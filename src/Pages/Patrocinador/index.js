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
import stylesButtons, {verdeClaro, verdeInativo} from '../../StyleSheet/Buttons';
import { onSelectedTypeSearch } from './Actions';

export class Patrocionador extends Component{
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
								<Col style={{ height: 40 }}>
										<Button block  
												style={{marginRight:10 , backgroundColor: this.props.typeForm ? verdeClaro : verdeInativo}} 
												onPress={() => this.props.onSelectedTypeSearch(true)}
												>
													<Icon name='thumb-up' style={{fontSize:20,color:'#FFFFFF'}} />       
													<Text>Sim, tenho</Text>
										</Button>
								</Col>
								<Col style={{ height: 40 }}>
										<Button block 
												style={{marginLeft:10 , backgroundColor: this.props.typeForm ? verdeInativo : this.props.typeForm == null ? verdeInativo : verdeClaro}} 
												onPress={() => this.props.onSelectedTypeSearch(false)}
												>
														<Icon name='thumb-down' style={{fontSize:20,color:'#FFFFFF'}} />    
														<Text>Não tenho</Text>
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
								<H3 style={{margin:15}}>Lista de patrocinadores</H3>
								<List>
										<FlatList
												data={this.props.user}
												keyExtractor={(item, index) => index} 
												renderItem={({item, id, index}) => {
												return <ListPatrocinador item={item} _obj={this.props}/>
												}
												}/>
								</List>
						</IF>
				</ScrollView>
			)
	}
}

const mapStateToProps = state => (state.patrocionador);
const mapDispatchToProps = dispatch => bindActionCreators({onSelectedTypeSearch},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Patrocionador)