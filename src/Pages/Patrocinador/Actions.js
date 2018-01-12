import React, { Component } from 'react';
import { Platform, AsyncStorage,Alert } from 'react-native';

import {RequestPostAuth,ApiStatusCode,RequestGetAuth,RequestGet} from '../../Helpers/Http' 

 export const changeLoading = (_value) => ({
		 type:'CHANGE_LOADING',
		 payload: _value
})

 export const BuscarPatrocinador = (_minisite) => {
  
	return dispatch => {
		dispatch(changeLoading(true));

		if(_minisite == null || _minisite == ''){
			Alert.alert('Atenção', 'Campo minisite obrigatório!');
			dispatch(changeLoading(false))
			return false;
		}
		RequestGet('get-sponsor/minisite/'+ _minisite)
		.then(resp => resp.json())
		.then(resp => {
			if(resp.data){
				dispatch({ type:'SET_PATROCINADORES',  payload: resp.data });
			}

			if(resp.error){
				Alert.alert('Atenção', 'Não foi possível encontrar o patrocinador');
				dispatch(changeLoading(false));
			}
		})
		.catch((error) => console.log(error));
	}
}

export const BuscarPatrocinadorCep = (_cep) => {
   
	return dispatch => {
		  dispatch(changeLoading(true))
		  if(_cep == null || _cep == ''){
   	       Alert.alert('Atenção', 'Campo CEP obrigatório!');
				   dispatch(changeLoading(false))
					 return false;
		   }
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
       
       if(state.coupon == null || state.coupon == ''){
   	       Alert.alert('Atenção', 'Campo cupom obrigatório!');
				    return false;
		   }

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