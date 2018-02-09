import React, { Component } from 'react';
import { Platform, AsyncStorage ,Alert} from 'react-native';
import { URL_API, headers, LOGIN, USER_TOKEN, USER_INFO } from './Constants';
import {NavigationActions} from 'react-navigation';


export function ApiStatusCode(response){
   
    if (response.errors != undefined) {
     let error = new Error(response.message);
      error.response = response.errors;
     
      throw error;
    } else {
       return response;
    }
  
};

 export const _navigateTo = (props, routeName) => {

        const actionToDispatch = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName })]
        })
       props.navigation.dispatch(actionToDispatch)
 }
  

export const RequestGet = (_url) => {

    return fetch(URL_API+_url, {
			method: 'GET',
			headers
		}) 
}

export const RequestPost = (_url,_body) => {
     console.log(URL_API+_url)
    
     return fetch(URL_API+_url, {
			method: 'POST',
			headers,
			body: JSON.stringify(_body)
		}); 
}


export const RequestGetAuth = async(_url) => {
    const TOKEN = await AsyncStorage.getItem(USER_TOKEN)

    return fetch(URL_API+_url, {
      method: 'GET',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer '+ TOKEN
        },
    }) 
}


export const RequestPostAuth = async(_url,_body) => {
    const TOKEN = await AsyncStorage.getItem(USER_TOKEN)
    
    return fetch(URL_API+_url, {
       method: 'POST',
       headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer '+ TOKEN
        },
       body: JSON.stringify(_body)
    }); 
}

export const doLogin = (_username,_password) =>{

      let username = _username;
      let password = _password;

      if(!username){
        Alert.alert('Atenção', 'Digite o seu login');
       }

      if(!password){
        Alert.alert('Atenção', 'Digite sua senha');
      }

         
    let data = {
      grant_type: LOGIN.grant_type,
      client_secret: LOGIN.client_secret,
      client_id: LOGIN.client_id,
      scope: LOGIN.scope,
      username: username,
      password: password
    };
      
     console.log(data)

    return dispatch => 
    {
      
       RequestPostAuth('oauth/token',data)
      .then(resp => resp.json())
      .then(resp => {
        if(resp.error != null && resp.error == 'invalid_credentials'){
            Alert.alert('Atenção', 'Login ou senha inválido');
              let error = new Error('Login ou senha inválido');
              error.response = response.errors;
             
              throw error;
          }else{
            let auth = {
              token_type: resp.token_type,
              access_token: resp.access_token
            };
                 
                 console.log(auth)
                 AsyncStorage.setItem(USER_TOKEN, resp.access_token)
             
          }
      })
      .then(resp => {
        dispatch(setUserCurrent());
       })
      .catch(error => {
         return false;
      })
    }   
    
   
}

export const setUserCurrent = async() => {
  return dispatch => {
      
       RequestGetAuth('users')
       .then(resp => resp.json())
       .then(res => {
        AsyncStorage.setItem(USER_INFO, JSON.stringify(res.data))
        console.log(res.data)
        
       })  
      
  }
}

/**
 * Requisições HTTP autenticadas
 */
export const RequestAuth = async(url, metodo, _body = {}) => {
  const TOKEN = await AsyncStorage.getItem(USER_TOKEN);
  let URL = URL_API + url;
  let http = null;
  let body = JSON.stringify(_body) || null;

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: 'Bearer '+ TOKEN
  }

  if(metodo === 'GET' || metodo === 'HEAD'){
		http = fetch(URL, {
			method: metodo,
			headers
		});
	} else {
		http = fetch(URL, {
			method: metodo,
			headers,
			body
		});
	}

  return http;
}

export const LogOutSistem = () => {
  return AsyncStorage.multiSet([[USER_INFO, ''], [USER_TOKEN, '']]);
}

export const AccessFast = (_error = () => {}, _success = () => {}) => {
  RequestGetAuth('users')
    .then(response => response.json())
    .then(response => {
      
      RequestGetAuth('carts')
        .then(resp => resp.json())
        .then(resp => {
          console.log('RESPOSTA', resp);
          let cart = 1;
          if(resp.error) {
            cart = 0;
          }

          try {
            const status = response.data.status.id;
            let tela = 'Home';

            // Pré-cadastro
            if(status == 26){
              if(cart == 1){
                tela = 'Drawer';
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
              tela = 'DrawerEv';
            }
            
            AsyncStorage.setItem(USER_INFO, JSON.stringify(response.data))
              .then(() => {
                _success(tela);
              });

          } catch (error) {
            Alert.alert('Atenção', 'Ocorreu um erro ao realizar o login.\nTente novamente mais tarde.');
            _error(error);
          }
        });
    })
    .catch(error => {
      Alert.alert('Atenção', 'Login expirou, acesse novamente!');
      _error(error);
    });
        
}