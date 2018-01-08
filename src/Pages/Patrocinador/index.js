/**
 *  Pagina para selecionar o patrocinador
 */
import React, { Component } from 'react';

/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {BuscarPatrocinador,onSelectedTypeSearch,onChangeField} from './Actions'

import { Platform , Alert, Content ,ScrollView ,FlatList,TouchableOpacity } from 'react-native';
import { View,Text ,Container, Form , Item,H3, Right,Radio,Input, Label,Button,Grid,Col ,Spinner,List,ListItem,Left,Thumbnail,Body} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import HeaderExterno from '../../Static/HeaderExterno'

/*Componentes*/
import IF from '../../Helpers/if'
import PatrocionadorBySite from './Components/FormBySite'
import PatrocionadorByCep from './Components/FormByCep'  
import ListPatrocinador from './Components/Lists'  

export class Patrocionador extends Component{
	constructor(props) {
	  super(props);
	  
	}
 
    render() {
    	console.log(this.props.user.length)
		return ( 
		 <ScrollView style={{paddingBottom:20}}>
		   <HeaderExterno item={this.props} title="Patrocinador" />
			    <View style={{margin:10}}>  
			      <Text style={{marginTop:20,marginBottom:15 }}>
		           Já tem um patrocionador? 
		        </Text>
		       
		         <Grid >
		          <Col style={{ height: 40 }}>
		              <Button block small  
		                        style={{marginRight:10 , backgroundColor: this.props.typeForm ? "#000000" : "#999999" }} 
		                        onPress={() => this.props.onSelectedTypeSearch(true)}
		                        >
		                   <Icon name='thumb-up' style={{fontSize:20,color:'#FFFFFF'}} />       
		                  <Text>Sim, tenho.</Text>
		               </Button>
		          </Col>
		          <Col style={{ height: 40 }}>
		                <Button block small 
		                        style={{marginLeft:10 , backgroundColor: this.props.typeForm ? "#999999" : this.props.typeForm == null ? "#999999" : "#000000"}} 
		                        onPress={() => this.props.onSelectedTypeSearch(false)}
		                   >
		                   <Icon name='thumb-down' style={{fontSize:20,color:'#FFFFFF'}} />    
		                  <Text>Não, tenho.</Text>
		               </Button>
		          </Col>
		     </Grid>

		 </View>

          <IF visible={this.props.typeForm}>
		      <PatrocionadorBySite />
		  </IF>

		  <IF visible={!this.props.typeForm}>
		      <PatrocionadorByCep />
		  </IF>

		 
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

const mapStateToProps = state => (state.patrocionador)
const mapDispatchToProps = dispatch => bindActionCreators({BuscarPatrocinador,onSelectedTypeSearch,onChangeField},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Patrocionador)