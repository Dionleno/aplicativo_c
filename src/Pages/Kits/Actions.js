import { AsyncStorage, Alert } from 'react-native';
import { RequestPostAuth, RequestGet } from '../../Helpers/Http';
import {
	CHANGE_FIELD_KIT,
	CHANGE_FIELD_KIT_OBJECT
} from '../../Types';

export const changeitem = (_item,_value) => ({
	type: CHANGE_FIELD_KIT,
	objectItem: _item,
	payload: _value
})

export const fetchGetKit = () => {
	return dispatch => {  
		console.log('KITS', 'Carregando kits...');
		RequestGet('kits')
			.then(resp => resp.json())
			.then(resp => {
				console.log('KITS', resp);
				dispatch({ type: CHANGE_FIELD_KIT_OBJECT, objectItem: 'kits', payload: resp.data})
			})
	}  
}

export const onSetKit = async(kit, props) => {
	return dispatch => {
		dispatch(onChangeFieldKit(kit.detail.id))

		Alert.alert(
			null,
			'Confirme a escolha do kit de adesão '+kit.name+' e comece agora mesmo.',
			[
				{text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Confirmar', onPress: () =>  dispatch(addProduto(kit.detail.id, props))},
			],
			{ cancelable: false }
		)
	}    
} 

export const addProduto = async(kitID, _props) => {
     
      const ItemDistribution = await AsyncStorage.getItem('@distributionID');
	    
     
      var data = {
        product_detail_id: kitID,
        amount: 1
      };

      return dispatch => 
	 {
      dispatch(changeitem('overlay',true))
     console.log(ItemDistribution)
     
		 	RequestPostAuth('carts',{distribution_center_id: ItemDistribution})
		 	 .then(resp => resp.json())
		     .then(resp => {
		     	     
                  RequestPostAuth('carts/products',data)
                   .then(respp => respp.json())
		               .then(respp => {
		               	console.log(respp)
		               })
		               .catch((error) => console.log(error));

		      })
		     .then(resp =>  {
            dispatch(changeitem('overlay',false))
		     	_props.navigation.navigate('Confirmacao')
		     })
		     .catch((error) => {
		     	 dispatch(changeitem('overlay',false))
		     	 console.log(error)
		     });
		   }
		    
}

export const onChangeFieldKit = (_value) => ({
		 type: CHANGE_FIELD_KIT,
		 payload: _value	 
})
 