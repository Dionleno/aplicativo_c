/**
 * Actions redux da tela de carrinho
 */
import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { USER_INFO } from '../../Helpers/Constants';
import { RequestAuth } from '../../Helpers/Http';

export const carregarCarrinho = () => {
  return dispatch => {
    RequestAuth('carts', 'GET')
      .then(response => response.json())
      .then(response => dispatch({ type: 'CARREGAR_CARRINHO', payload: response.data.products }))
      .catch(error => console.log(error));
  }
}

export const check = (value, checked) => {
  let n = checked;
  let indexOf = n.indexOf(value);

  if(indexOf > -1){
    n.splice(indexOf, 1);
  }else{
    n.push(value);
  }
  
  return {
    type: 'CHECK_ITEM',
    payload: n
  }
}

export const excluir = () => {
  return (dispatch, getState) => {
    let checked = getState().carrinho.checked;
		let message = 'este produto';

		if(checked.length > 0){
			if(checked.length > 1){
				message = 'estes produtos';
			}

			Alert.alert('Atenção', 'Deseja excluir ' + message + ' do seu carrinho?',
				[
					{text: 'Cancelar', onPress: () => {}, style: 'cancel'},
					{text: 'Sim', onPress: () => {
              if(checked.length > 0){
                checked.map(idProdutoCarrinho => {
                  RequestAuth('carts/' + idProdutoCarrinho, 'DELETE')
                    .then(response => response.json())
                    .then(response => {
                      dispatch({ type: 'CARREGAR_CARRINHO', payload: response.data.products });
                      dispatch({ type: 'CHECK_ITEM', payload: [] });
                    })
                    .catch(error => console.log(error));
                });
              }
            } 
          }
				],
					{cancelable: false}
				);
		} else {
			Alert.alert('Atenção', 'Escolha pelo menos um produto');
    }
  }
}