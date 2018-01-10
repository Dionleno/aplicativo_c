import React, { Component } from 'react';
import { Platform, AsyncStorage, Alert } from 'react-native';

import { RequestPostAuth, ApiStatusCode, RequestGetAuth, RequestGet, RequestPost } from '../../Helpers/Http';
import { LOGIN, USER_INFO, USER_TOKEN } from '../../Helpers/Constants';
 
export const changeLoading = (_value) => ({
	type:'CHANGE_LOADING',
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
		dispatch(changeLoading(true))

		RequestPostAuth('oauth/token',data)
			.then(resp => resp.json())
			.then(resp => {

				if(resp.error != null && resp.error == 'invalid_credentials'){
					Alert.alert('Atenção', 'Login ou senha inválido');
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
					RequestGetAuth('users', res => AsyncStorage.setItem(USER_INFO, JSON.stringify(res.data)))
					_props.navigation.navigate('Drawer');
				}
				dispatch(changeLoading(false))
			})
			.catch(error => {
				Alert.alert('Atenção', 'Login ou senha inválido');
				dispatch(changeLoading(false))
			})
	}

}

export const onChangeField = (_value,_obj) => ({
	type:'CHANGE_FIELD',
	payload: _value,
	objectItem: _obj
})