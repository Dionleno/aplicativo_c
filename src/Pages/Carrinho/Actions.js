/**
 * Actions redux da tela de carrinho
 */

import { Alert } from 'react-native';
import { RequestAuth } from '../../Helpers/Http';
import {
  CARREGAR_CARRINHO,
  CHECK_ITEM,
  LOAD_CARRINHO,
  INFORMACAO_CARRINHO
} from '../../Types';

export const carregarCarrinho = () => {
  return (dispatch, getState) => {
    
    dispatch(loadCarrinho(true));
    dispatch({ type: CARREGAR_CARRINHO, payload: [] });
    dispatch(informacao(''));

    RequestAuth('carts', 'GET')
      .then(response => response.json())
      .then(response => {
        try {
          dispatch(informacao(response.error.message));
        } catch (e) {

        }

        try {
          dispatch({ type: CARREGAR_CARRINHO, payload: response.data.products });
        } catch (e) {

        }

        if(response.data.products.length == 0){
          dispatch(informacao('Você ainda não possui nenhum produto no seu carrinho'));
        }
        
        dispatch(loadCarrinho(false));
      })
      .catch(error => {
        console.log(error);
        disatch(loadCarrinho(false));
      });
  }
}

export const informacao = value => {
  return {
    type: INFORMACAO_CARRINHO,
    payload: value
  }
}

export const loadCarrinho = value => {
  return {
    type: LOAD_CARRINHO,
    payload: value
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
    type: CHECK_ITEM,
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
                      dispatch({ type: CARREGAR_CARRINHO, payload: response.data.products });
                      dispatch({ type: CHECK_ITEM, payload: [] });
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

/* export const reset = () => {

} */