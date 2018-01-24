import { AsyncStorage, Alert } from 'react-native';
import { RequestGet } from '../../Helpers/Http';
import {
	SET_PATROCINADORES,
	CHANGE_FIELD_PATROCINADOR,
	CHANGE_LOADING_PATROCINADOR
} from '../../Types';

export const changeLoading = (_value) => ({
	type: CHANGE_LOADING_PATROCINADOR,
	payload: _value
})

export const BuscarPatrocinador = () => {
  
	return (dispatch, getState) => {
		const { patrocionador } = getState();
		let _minisite = patrocionador.findtext;
		
		if(_minisite != ''){
			dispatch(changeLoading(true));
			RequestGet('get-sponsor/minisite/'+ _minisite)
			.then(resp => resp.json())
			.then(resp => {
				if(resp.data){
					dispatch({ type: SET_PATROCINADORES,  payload: resp.data });
				}

				if(resp.error){
					Alert.alert('Atenção', 'Não foi possível encontrar o patrocinador');
					dispatch(changeLoading(false));
				}
			})
			.catch((error) => console.log(error));
		}
	}
}

export const BuscarPatrocinadorCep = () => {
	return (dispatch, getState) => {
		const { patrocionador } = getState();
		let _cep = patrocionador.findtextcep;
		
		if(_cep != ''){
			dispatch(changeLoading(true));
			RequestGet('get-sponsor/zip/'+ _cep)
			.then(resp => resp.json())
			.then(resp => {
				
				if(resp.error != null){
					Alert.alert('Atenção', 'O CEP digitado não foi encontrado!');
					dispatch(changeLoading(false))
					return false;
				}
				
				dispatch({ type: SET_PATROCINADORES,  payload: resp.data, });
			})
			.catch((error) => console.log(error));
		}
	}
}

export const onSelectedPatrocinador = async(_user,_props) => {
		await AsyncStorage.setItem('@UIPatrocinador',  JSON.stringify(_user))
		return dispatch => {
		  _props.navigation.navigate('Cadastro')
		}     
}
 
export const onSelectedTypeSearch = (_value) => ({
		 type: CHANGE_FIELD_PATROCINADOR,
		 payload: _value,
		 objectItem:'typeForm'
})

export const onChangeField = (_value,_obj) => ({
		 type: CHANGE_FIELD_PATROCINADOR,
		 payload: _value,
		 objectItem: _obj
})


