
import React, { Component } from 'react';
import { Platform, AsyncStorage } from 'react-native';


export const URL_API = 'https://magic-store-api-dev.contem1gmagic.com.br/';
 
export const headers = { Accept: 'application/json', 'Content-Type': 'application/json'};

export const LOGIN = {
  grant_type: 'password',
  client_secret: '1MwSGy9Ai8rhXS8zAd6iOmaCADzCwtrFOUy385z7',
  client_id: '2',
  scope: '*'
}; 


export function ApiStatusCode(response){  
   
    if (response.errors != undefined) {
     let error = new Error(response.message);
      error.response = response.errors;
     
      throw error;
    } else {
       return response;
    }
  
};
  

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
    const TOKEN = await AsyncStorage.getItem('@usertoken')
    
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
    const TOKEN = await AsyncStorage.getItem('@usertoken')
    
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
        return false;
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
          }else{
            let auth = {
              token_type: resp.token_type,
              access_token: resp.access_token
            };
                 
                 console.log(auth)
            AsyncStorage.setItem('@usertoken', resp.access_token)
             
          }
      })
      .then(resp => {
         RequestGetAuth('users',res => AsyncStorage.setItem('@Userinfo',JSON.stringify(res.data)))
      })
      .catch(error => console.log(error))
    }   
    
   
}