import React, { Component } from 'react';
import { Platform, AsyncStorage,Alert } from 'react-native';

import {RequestPostAuth,ApiStatusCode,RequestGetAuth,RequestGet,RequestPost,doLogin} from '../../Helpers/Http' 

 export const changeLoading = (_value) => ({
		 type:'CHANGE_LOADING',
		 payload: _value
})
 
export const handlerSubmit = async(_props) =>{
       /*
	   * @buscar o patrocinador armazenado em variavel local
	   */
	    const value = await AsyncStorage.getItem('@UIPatrocinador');
	    const coupon = await AsyncStorage.getItem('@InfoCupom');
	    const patrocinador = JSON.parse(value);
 
    return dispatch => 
		{
       /*
	   * @Montar o array com os dados necessario para registro do usuario 
	   */
	  let form = {user: {..._props.user, email_confirmation:_props.user.email,password_confirmation:_props.user.password,address: _props.address ,telephones:_props.telephones} ,sponsor:{id:patrocinador.id}  ,terms:_props.checked}
       
     //verificar se existe coupon  
     if(coupon != '' && coupon != null){   
        form['coupon'] = coupon
     }
       console.log(form)
       /*
	   * @Fazer o envio para cadastrar o usuario
	   */       
       RequestPost('register',form)
		  .then(resp => resp.json())
		  .then(resp => {
                  console.log(resp)
		  	    //Verificar se retornou algum erro
                if(resp.errors){
                	console.log(resp.errors)
                	dispatch({ type:'CHANGE_FIELD',objectItem: 'errors', payload: resp.errors })
                	Alert.alert('Erro ao validar formulario', 'Verifique os campos e tente novamente');

                }else if(coupon != '' && coupon != null){
                   /*
								   * @Fazer o login com o usuario cadastrado
								   */
                   dispatch(doLogin(_props.user.login,_props.user.password))
                    AsyncStorage.removeItem('@UIPatrocinador')
                    AsyncStorage.removeItem('@InfoCupom')

                    _props.navigation.navigate('CupomAgradecimento');     
                }else{

                   /*
								   * @Fazer o login com o usuario cadastrado
								   */
                   dispatch(doLogin(_props.user.login,_props.user.password))

                  /*
							   * @Verificar se o usuario selecionou a retirada dos produtos em algum centro de distribuição
							   */
							    console.log(_props.user.distribution_center_id)
                   if(_props.user.distribution_center_id != ''){
                        AsyncStorage.setItem('@distributionID', JSON.stringify(_props.user.distribution_center_id)) 
									   }else{
									       AsyncStorage.setItem('@distributionID','')
									   }

				            _props.navigation.navigate('Kits');
                }


					   
		   })
		  .catch((error) => console.log(error));
	}
   
}

export const onGetAddressByCep = async(cep) => {
  return dispatch => 
   	{
   		 RequestGet('/general/zip/'+cep)
	      .then(resp => resp.json())
	      .then(resp => {
	      	dispatch(changeStateBindCity(resp.data.city.state.id, 0))	 
	        dispatch({ type:'CHANGE_FIELD_ADDRESS',objectItem: 'street', payload: resp.data.data.logradouro +', '+ resp.data.data.bairro })
	        dispatch({ type:'CHANGE_FIELD_ADDRESS',objectItem: 'city_id', payload: resp.data.city.id, })
	      })

   	}
}
export const onselectStateDistribution = async(item) => {
  console.log(item)
       return dispatch => 
	   	{
		  RequestGet('/general/distribution_centers/'+item)
		  .then(resp => resp.json())
		  .then(resp => dispatch({ type:'CHANGE_FIELD',objectItem: 'centers', payload: resp.data, }))
		  .then(resp => dispatch({ type:'CHANGE_FIELD',objectItem: 'centers_state_id', payload: item, }))
		  .catch((error) => console.log(error));
		}
}

export const changeStateBindCity = async(itemValue, itemIndex) =>{
  if(itemValue != '' && itemValue > 0)
  {
   	return dispatch => 
   	{
	  RequestGet('general/'+itemValue+'/cities')
	  .then(resp => resp.json())
	  .then(resp => dispatch({ type:'CHANGE_FIELD',objectItem: 'cities', payload: resp.data, }))
	  .then(resp => dispatch({ type:'CHANGE_FIELD_ADDRESS',objectItem: 'district', payload: itemValue, }))
	  .catch((error) => console.log(error));
	}
  }
}

 
export const onChangeField = (_value,_obj) => ({
		 type:'CHANGE_FIELD',
		 payload: _value,
		 objectItem: _obj
})

export const onChangeFieldUser = (_value,_obj) => ({
		 type:'CHANGE_FIELD_USER',
		 payload: _value,
		 objectItem: _obj
})

export const onChangeFieldAddress = (_value,_obj) => ({
		 type:'CHANGE_FIELD_ADDRESS',
		 payload: _value,
		 objectItem: _obj
})

export const onChangeFieldPhone = (_value,_obj) => ({
		 type:'CHANGE_FIELD_PHONE',
		 payload: _value,
		 objectItem: _obj
})