import React, { Component } from 'react';
import { Platform, AsyncStorage,Alert } from 'react-native';

import {RequestPostAuth,ApiStatusCode,RequestGetAuth,RequestGet,RequestPost,doLogin} from '../../Helpers/Http' 

export const cadastrarContato = popupDialogContato => {
	return (dispatch, getState) => {
		const {phone_number, phone_types, phone_companies} = getState().cadastro;
		
		if(!phone_number){
			Alert.alert('Atenção', 'Digite o número do telefone');
			return;
		}

		if(!phone_companies.selected || phone_companies.selected == '' || phone_companies.selected == '0'){
			Alert.alert('Atenção', 'Escolha a operadora');
			return;
		}

		if(!phone_types.selected || phone_types.selected == '' || phone_types.selected == '0'){
			Alert.alert('Atenção', 'Escolha o tipo do telefone de contato');
			return;
		}

		let phone_type_label = '';

		for(let i=0; i<phone_types.data.length; i++){
			if(phone_types.data[i].id == phone_types.selected){
				phone_type_label = phone_types.data[i].description;
				break;
			}
		}

		dispatch(
			{
				type: 'ADD_PHONE', 
				payload: {
					telephone: phone_number, 
					telephone_company_id: phone_companies.selected, 
					telephone_type_id: phone_types.selected,
					phone_type_label,
					whatsapp: 0
				}
			}
		);

		dispatch({type: 'CHANGE_PHONE_NUMBER', payload: ''});
		dispatch({type: 'CHANGE_PHONE_COMPANY', payload: ''});
		dispatch({type: 'CHANGE_PHONE_TYPE', payload: ''});
		dispatch({type: 'CHANGE_PHONE_TYPE_LABEL', payload: ''});

		popupDialogContato.dismiss();
	}
}

export const changePhoneNumber = value => {
	return {
		type: 'CHANGE_PHONE_NUMBER',
		payload: value
	};
}

export const SetFieldPhone = value =>{
    
    

 
return (dispatch,getState) => 
	   { 
       
       Alert.alert(
	          null,
	          'Deseja deletar esse contato?',
	          [
	            {text: 'Cancelar', onPress: () => {return false} , style: 'cancel'},
	            {text: 'Confirmar', onPress: async() =>{ 
                    dispatch({type: 'SET_FIELD_PHONE', payload: value})
               }},
	          ],
	          { cancelable: false }
	        )
		     

		   	  


	};
}

export const changePhoneCompany = value => {
	return {
		type: 'CHANGE_PHONE_COMPANY',
		payload: value
	};
}

export const changePhoneType = value => {
	return {
		type: 'CHANGE_PHONE_TYPE',
		payload: value
	};
}

export const loadPhoneCompanies = () => {
	return dispatch => {
		RequestGet('general/phone_companies')
    .then(response => response.json())
    .then(response => dispatch({type: 'DATA_PHONE_COMPANY', payload: response.data}))
    .catch(error => console.log(error));
	}
};

export const loadPhoneTypes = () => {
	return dispatch => {
		RequestGet('general/phone_types')
    .then(response => response.json())
    .then(response => dispatch({type: 'DATA_PHONE_TYPES', payload: response.data}))
    .catch(error => console.log(error));
	}
}

export const spinnerOverlay = value => {
	return {
		type: 'SPINNER_OVERLAY',
		payload: value
	};
};

export const changeLoading = (_value) => ({
	type:'CHANGE_LOADING',
	payload: _value
});

export const verificarEmail = () => {
	return (dispatch, getState) => {
		let user = getState().cadastro.user;
		if(user.email != user.email_confirmation){
			Alert.alert('Atenção', 'Os e-mails não conferem');
		}
	}
}

export const verificarSenha = () => {
	return (dispatch, getState) => {
		let user = getState().cadastro.user;

		if(user.password != user.password_confirmation){
			Alert.alert('Atenção', 'As senhas não conferem');	
		}
	};
};

export const phoneCompanies = () => {
	return dispatch => {
		RequestGet('general/phone_types')
    .then(response => response.json())
    .then(response => dispatch(onChangeField(response.data, 'phone_types')))
    .catch(error => console.log(error));
	}
};

export const handlerSubmit = async(_props) =>{
	/*
	* @buscar o patrocinador armazenado em variavel local
	*/
	const value = await AsyncStorage.getItem('@UIPatrocinador');
	const coupon = await AsyncStorage.getItem('@InfoCupom');
	const patrocinador = JSON.parse(value);
 
  return dispatch => {
    /*
	   * @Montar o array com os dados necessario para registro do usuario 
	   */
	  let form = {
			user: {
				..._props.user, 
				email_confirmation: _props.user.email,
				password_confirmation: _props.user.password,
				address: _props.address
			},
			telephones: _props.telephones,
			sponsor: {
				id:patrocinador.id
			},
			terms: _props.checked
		};

		//verificar se existe coupon  
    if(coupon != '' && coupon != null){   
    	form['coupon'] = coupon
		}
		
		/*
		* @Fazer o envio para cadastrar o usuario
		*/
		dispatch(spinnerOverlay(true));
		
		RequestPost('register',form)
		.then(resp => resp.json())
		.then(resp => {
			console.log(resp)
			//Verificar se retornou algum erro
			if(resp.errors){
				console.log(resp.errors)
				dispatch({ type:'CHANGE_FIELD',objectItem: 'errors', payload: resp.errors })
				dispatch(spinnerOverlay(false));
				Alert.alert('Erro ao validar formulário', 'Verifique os campos e tente novamente');
			}else if(coupon != '' && coupon != null){
				/*
				* @Fazer o login com o usuario cadastrado
				*/
				dispatch(doLogin(_props.user.login,_props.user.password))
				dispatch(spinnerOverlay(false));
				AsyncStorage.removeItem('@UIPatrocinador')
				AsyncStorage.removeItem('@InfoCupom')

				_props.navigation.navigate('CupomAgradecimento');     
			}else{
				dispatch(spinnerOverlay(false));

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
	return (dispatch, getState) => {
		if(cep != '' && cep.length == 9){

			dispatch(spinnerOverlay(true));
			
			RequestGet('/general/zip/'+cep)
			.then(resp => resp.json())
			.then(resp => {
				try{
					dispatch({ type:'CHANGE_FIELD_ADDRESS',objectItem: 'street', payload: resp.data.data.logradouro });
					dispatch({ type:'CHANGE_FIELD_ADDRESS',objectItem: 'district', payload: resp.data.data.bairro });
					dispatch({ type:'CHANGE_FIELD_ADDRESS',objectItem: 'city_id', payload: resp.data.city.id });
					dispatch(changeStateBindCity(resp.data.city.state.id, 0));
				}catch(e){
					Alert.alert('Atenção', 'Não foi possível buscar o endereço através deste CEP');
					dispatch(spinnerOverlay(false));
				}
			})
			.catch(error => console.log('ERRO', error));
		}
	}
}

export const onselectStateDistribution = item => {
	return dispatch => {
		dispatch({ type:'CHANGE_FIELD', objectItem: 'centers_state_id', payload: item });
		dispatch({ type:'CHANGE_FIELD', objectItem: 'centers', payload: [] });

		if(item != ''){
			dispatch(spinnerOverlay(true));
			
			RequestGet('/general/distribution_centers/'+item)
			.then(resp => resp.json())
			.then(resp => {
				dispatch({ type:'CHANGE_FIELD', objectItem: 'centers', payload: resp.data });
				dispatch(spinnerOverlay(false));
			})
			.catch((error) => {
				dispatch(spinnerOverlay(false));
				console.log(error);
			});
		}
	}
}

export const changeStateBindCity = (itemValue, itemIndex) => {
  if(itemValue != '' && itemValue > 0) {
   	return dispatch => {
			RequestGet('general/'+itemValue+'/cities')
			.then(resp => resp.json())
			.then(resp => {
				dispatch({ type:'CHANGE_FIELD', objectItem: 'cities', payload: resp.data });
				dispatch({ type:'CHANGE_FIELD_ADDRESS', objectItem: 'state_id', payload: itemValue });
				dispatch(spinnerOverlay(false));
			})
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