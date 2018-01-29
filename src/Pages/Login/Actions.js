import React, { Component } from 'react';
import { Platform, AsyncStorage, Alert } from 'react-native';

import { RequestPostAuth, ApiStatusCode, RequestGetAuth, RequestGet, RequestPost } from '../../Helpers/Http';
import { LOGIN, USER_INFO, USER_TOKEN } from '../../Helpers/Constants';
import {_navigateTo} from '../../Helpers/Http'


export const changeLoading_login = (_value) => ({
	type:'CHANGE_LOADING_LOGIN',
	payload: _value
})

export const handlerLogin = async(_props) =>{
        
	let username = _props.form.login;
	let password = _props.form.senha;
	
	if(username === ''){
		Alert.alert('Atenção', 'Digite o seu login');
		return dispatch =>  false
	}

	if(password === ''){
		Alert.alert('Atenção', 'Digite sua senha');
		return dispatch =>  false
	}

	let data = {
		grant_type: LOGIN.grant_type,
		client_secret: LOGIN.client_secret,
		client_id: LOGIN.client_id,
		scope: LOGIN.scope,
		username: username,
		password: password
	};
	return dispatch => 
	{
		dispatch(changeLoading_login(true))

		RequestPostAuth('oauth/token', data)
			.then(resp => resp.json())
			.then(resp => {
				if(resp.error != null && resp.error == 'invalid_credentials'){
					Alert.alert('Atenção', 'Login ou senha inválido');
					return false;
				}else if(resp.access_token == undefined){
           Alert.alert('Atenção', 'Erro ao realizar o login, tente novamente!');
				 	return false;
				}else{
					let auth = {
						token_type: resp.token_type,
						access_token: resp.access_token
					};

					console.log(auth)
					AsyncStorage.setItem(USER_TOKEN, resp.access_token)

					return resp;
				}
			})
			.then(resp => {
				if(resp != false){
					console.log(resp)
				  dispatch(setUserCurrent(_props))
				}
				dispatch(changeLoading_login(false))
			})
			.catch(error => {
				Alert.alert('Atenção', 'Login ou senha inválido');
				dispatch(changeLoading_login(false))
			})
	}

}

export const setUserCurrent = async(_props) => {
   return dispatch =>{
     	
   	   RequestGetAuth('users')
   	   .then(resp => resp.json())
   		 .then(res => {
   			AsyncStorage.setItem(USER_INFO, JSON.stringify(res.data))
   		  console.log(res.data)
   		 _navigateTo(_props, 'Drawer');
   	   })  
   		
   }
}

export const onChangeField = (_value,_obj) => ({
	type:'CHANGE_FIELD',
	payload: _value,
	objectItem: _obj
})