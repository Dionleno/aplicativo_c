import React, { Component } from 'react';
import { Platform, AsyncStorage,Alert } from 'react-native';

import {RequestPostAuth,ApiStatusCode,RequestGetAuth,RequestGet} from '../../Helpers/Http' 

 export const changeLoading = (_value) => ({
		 type:'CHANGE_LOADING',
		 payload: _value
})

 export const BuscarPatrocinador = (_minisite) => {
   
	return dispatch => {
		  dispatch(changeLoading(true))
		  RequestGet('get-sponsor/minisite/'+ _minisite)
		  .then(resp => resp.json())
		  .then(resp => dispatch({ type:'SET_PATROCINADORES',  payload: resp.data, }))
		  .catch((error) => console.log(error));
		  
		}
}

export const BuscarPatrocinadorCep = (_cep) => {
   
	return dispatch => {
		  dispatch(changeLoading(true))
		  RequestGet('get-sponsor/zip/'+ _cep)
		  .then(resp => resp.json())
		  .then(resp => {
		  	 if(resp.error != null){
				            Alert.alert('Atenção', 'O CEP digitado não foi encontrado!');
				             dispatch(changeLoading(false))
				              return false;
				 }
		  	console.log(resp)
		  	dispatch({ type:'SET_PATROCINADORES',  payload: resp.data, })
		  })
		  .catch((error) => console.log(error));
		  
		}
}

export const onSelectedPatrocinador = async(_user,_props) => {
	 await AsyncStorage.setItem('@UIPatrocinador',  JSON.stringify(_user))
		return dispatch => {
		      	_props.navigation.navigate('Cadastro')
		}     
}
 
export const onSelectedTypeSearch = (_value) => ({
		 type:'CHANGE_FIELD',
		 payload: _value,
		 objectItem:'typeForm'
})

export const onChangeField = (_value,_obj) => ({
		 type:'CHANGE_FIELD',
		 payload: _value,
		 objectItem: _obj
})


/*CUPOM DE ATIVAÇÃO*/
 

export const requestCupom = (_props) =>{
    
	return (dispatch,getState) => 
		 {
        const state = getState().patrocionador;
	     	RequestGet('coupon/'+ state.coupon)
				  .then(resp => resp.json())
				  .then(resp => {
				  	 if(resp.error != null){
						            Alert.alert('Atenção',resp.error.message);
						            return false;
						 }
				  	console.log(resp.data)
				  	_props.navigation.navigate('CupomAtivacao', {cupominfo:resp.data})
				  })
				  .catch((error) => console.log(error));
	   }
}