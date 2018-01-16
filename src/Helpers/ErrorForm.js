import React, { Component } from 'react';
import {  Platform, View, Image} from 'react-native';
import { Text} from 'native-base';

export default props => {
	if(props.arrayError != null && props.filterValidate != undefined){
		return <Text style={{marginBottom:5,color:'red',fontSize:11}}>{props.filterValidate}</Text>
	}else{
		return <Text note style={{marginBottom:5, color: 'red', fontSize: 11}}>{props.filterValidate}</Text>
	}
}