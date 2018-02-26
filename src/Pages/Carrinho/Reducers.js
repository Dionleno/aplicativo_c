/**
 * 
 * Reducers da tela de carrinho
 */

import _ from 'lodash';
import {
	CARREGAR_CARRINHO,
	CHECK_ITEM,
	LOAD_CARRINHO,
	INFORMACAO_CARRINHO,
  CARRINHO_CHECKOUT
} from '../../Types';

const INITIAL_STATE = {
	produtos: [],
	checked: [],
	info: '',
	checkout: true,
	loading: {
		carrinho: true
	}
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case CARREGAR_CARRINHO:
			let checkout = true;
			let info = '';
			const payload = action.payload;

			if(payload.length > 0){
				for(let i = 0; i < payload.length; i++){
					const { stocks } = payload[i].detail;
					if(_.first(stocks).amount_virtual <= 0){
						checkout = false;
						break;
					}
				}
			}

			if(!checkout){
				info = 'Você possui produtos indisponíveis no seu carrinho. Remova-os para prosseguir';
			}

			return {...state, produtos: action.payload, checkout, info};
		case CHECK_ITEM:
			return {...state, checked: action.payload};
		case LOAD_CARRINHO:
			return {...state, loading: {...state.loading, carrinho: action.payload}};
		case INFORMACAO_CARRINHO:
			return {...state, info: action.payload};
		case CARRINHO_CHECKOUT:
			return {...state, checkout: action.payload};
		default:
			return state;
	}
}