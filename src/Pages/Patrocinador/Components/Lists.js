
/**
 *  Componente para lista patrocinadores
 */
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Left, Thumbnail, Body} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {BuscarPatrocinadorCep,onSelectedTypeSearch,onChangeField,onSelectedPatrocinador} from '../Actions'  
import Icon from 'react-native-vector-icons/MaterialIcons'
 


export const ListPatrocinador = props => {
	let User = props.item;
	 
    let Media = User.media.length > 0 ? User.media[0].url : null;
    
   
    return (
		<ListItem avatar button onPress={() => props.onSelectedPatrocinador(User,props._obj)} style={{width: '100%', marginLeft: 0, paddingLeft: 8, paddingRight: 0, marginRight: 0}}>
			<Left>
				<Thumbnail square size={80} source={Media != null ? { uri: Media } : require('../../../Images/avatar.png')} />
			</Left>
			<Body>
				<Text>{User.name}</Text>
				<Text note>{User.minisite}</Text>
			</Body>
			<Right style={{justifyContent: 'center'}}>
				<Icon name='keyboard-arrow-right' style={{fontSize:22,color:'#000000'}}/>
			</Right>
		</ListItem>
	);
 
}

const mapStateToProps = state => (state.patrocionador)
const mapDispatchToProps = dispatch => bindActionCreators({BuscarPatrocinadorCep,onSelectedTypeSearch,onChangeField,onSelectedPatrocinador},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(ListPatrocinador)