/**
 * 
 * Reducers da tela de carrinho
 */

import {
	CARREGAR_CARRINHO,
	CHECK_ITEM,
	LOAD_CARRINHO,
	INFORMACAO_CARRINHO
} from '../../Types';

const INITIAL_STATE = {
	produtos: [],
	checked: [],
	info: '',
	loading: {
		carrinho: true
	}
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case CARREGAR_CARRINHO:
			return {...state, produtos: action.payload};

		case CHECK_ITEM:
			return {...state, checked: action.payload};
		
		case LOAD_CARRINHO:
			return {...state, loading: {...state.loading, carrinho: action.payload}};

		case INFORMACAO_CARRINHO:
			return {...state, info: action.payload};

		default:
			return state;
	}
}