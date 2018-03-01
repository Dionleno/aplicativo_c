import {  AsyncStorage, Alert } from 'react-native';
import { RequestPostAuth, RequestGetAuth, RequestAuth } from '../../Helpers/Http';
import { LOGIN, USER_INFO, USER_TOKEN } from '../../Helpers/Constants';
import { _navigateTo } from '../../Helpers/Http';
import { redirecionarUsuarioComBaseStatus } from '../../Helpers/Functions';
import {
	CHANGE_LOADING_LOGIN,
	CHANGE_FIELD_LOGIN,
	CHANGE_LOADING_LOGADO,
	LOGIN_FIELD_RESET
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

							RequestAuth('users', 'GET')
								.then(response => response.json())
								.then(response => {
									try {
										const status = response.data.status.id;
										let tela = redirecionarUsuarioComBaseStatus(status);
										
										AsyncStorage.setItem(USER_INFO, JSON.stringify(response.data))
											.then(() => {
												_navigateTo(_props, tela);
												dispatch(changeLoading(false));
												dispatch({type: LOGIN_FIELD_RESET});
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