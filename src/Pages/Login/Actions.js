import {  AsyncStorage, Alert } from 'react-native';
import { RequestPostAuth, RequestGetAuth, RequestAuth } from '../../Helpers/Http';
import { LOGIN, USER_INFO, USER_TOKEN } from '../../Helpers/Constants';
import { _navigateTo } from '../../Helpers/Http';
import {
	CHANGE_LOADING_LOGIN,
	CHANGE_FIELD_LOGIN,
	CHANGE_LOADING_LOGADO
} from '../../Types';

 
export const changeLoading = (_value) => ({
	type: CHANGE_LOADING_LOGIN,
	payload: _value
})

export const changeLoadingLogado = value => {
	return {
		type: CHANGE_LOADING_LOGADO,
		payload: value
	};
}

export const handlerLogin = (_props) => {

	let username = _props.form.login;
	let password = _props.form.senha;
	
	if(username === ''){
		Alert.alert('Atenção', 'Digite o seu login');
		return dispatch => false;
	}

	if(password === ''){
		Alert.alert('Atenção', 'Digite sua senha');
		return dispatch => false;
	}

	let data = {
		grant_type: LOGIN.grant_type,
		client_secret: LOGIN.client_secret,
		client_id: LOGIN.client_id,
		scope: LOGIN.scope,
		username: username,
		password: password
	};

	return dispatch => {
		dispatch(changeLoading(true))

		RequestPostAuth('oauth/token', data)
			.then(response => response.json())
			.then(response => {

				if(response.error){
					Alert.alert('Atenção', 'Login ou senha inválido');
					dispatch(changeLoading(false));
					return;
				}
         
     


				
				try {
					AsyncStorage.setItem(USER_TOKEN, response.access_token)
						.then(() => {

							   let cart = 0;

									RequestGetAuth('carts')
							    .then(resp => resp.json())
							    .then(resp => {
							    		console.log("resposta")
							    	console.log(resp)
							      if(resp.error) {
							          cart = 0;
							      }else{
							          cart = 1;
							      }
							    });

							RequestAuth('users', 'GET')
								.then(response => response.json())
								.then(response => {
                   

									try {
										const status = response.data.status.id;
										let tela = 'Home';
                    
                    console.log(cart)
										// Pré-cadastro
										if(status == 26){

												if(cart == 1){
	                       							tela = 'Produto';
												}else{
	                         						tela = 'Kits';
												}
											
										}
										
										// Aguardando ativação
										if(status == 3){
											tela = 'AguardandoAtivacao';
										}
										
										// Ativo
										if(status == 1){
											tela = 'HomeEv';
										}
										
										AsyncStorage.setItem(USER_INFO, JSON.stringify(response.data))
											.then(() => {
												_navigateTo(_props, tela);
												dispatch(changeLoading(false));
											});

									} catch (error) {
										Alert.alert('Atenção', 'Ocorreu um erro ao realizar o login.\nTente novamente mais tarde.');
										dispatch(changeLoading(false));
									}
									
								})
								.catch(error => {
									Alert.alert('Atenção', 'Ocorreu um erro ao realizar o login.\nTente novamente mais tarde.');
									dispatch(changeLoading(false));
								});
						})
						.catch(() => {
							dispatch(changeLoading(false));
							Alert.alert('Atenção', 'Login ou senha inválido');
						});
				} catch (error) {
					Alert.alert('Atenção', 'Login ou senha inválido');
					dispatch(changeLoading(false));
					console.log('LOGIN_ERRO', error);
				}

			})
			.catch(error => {
				Alert.alert('Atenção', 'Login ou senha inválido');
				dispatch(changeLoading(false));
			});
	}

}

export const setUserCurrent = (_props) => {
	return dispatch => {
		RequestGetAuth('users')
			.then(resp => resp.json())
			.then(resp => {
				AsyncStorage.setItem(USER_INFO, JSON.stringify(resp.data));
				console.log(resp.data);
				dispatch(changeLoading(false))
				_navigateTo(_props, 'Produto');
			});
	}
}

export const onChangeField = (_value,_obj) => ({
	type: CHANGE_FIELD_LOGIN,
	payload: _value,
	objectItem: _obj
})