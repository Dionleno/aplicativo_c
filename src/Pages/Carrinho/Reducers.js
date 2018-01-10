/**
 * 
 * Reducers da tela de carrinho
 */

const INITIAL_STATE = {
	produtos: [],
	checked: []
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'CARREGAR_CARRINHO':
			return {...state, produtos: action.payload};

		case 'CHECK_ITEM':
			return {...state, checked: action.payload};
		
		default:
			return state;
	}
}