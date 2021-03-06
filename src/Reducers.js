/**
 * Contém1g App
 * @Routes de reducer
 * @flow
 */

import {combineReducers} from 'redux';
import homeReducers from './Pages/Home/Reducers';
import patrocionadorReducers from './Pages/Patrocinador/Reducers';
import cadastroReducers from './Pages/Cadastro/Reducers';
import kitsReducers from './Pages/Kits/Reducers';
import confirmeReducers from './Pages/CadastroConfirmacao/Reducers';
import loginReducers from './Pages/Login/Reducers';
import carrinhoReducers from './Pages/Carrinho/Reducers';
import produtoReducers from './Pages/Produto/Reducers';
import checkoutReducers from './Pages/Checkout/Reducers';
import pedidosReducers from './Ev/Pedidos/Reducers';
import retiradaReducers from './Ev/Retirada/Reducers';

const rootReducer = combineReducers({
	home: homeReducers,
	login: loginReducers,
	patrocionador: patrocionadorReducers,
	cadastro: cadastroReducers,
	kits: kitsReducers,
	confirmacao: confirmeReducers,
	carrinho: carrinhoReducers,
	produto: produtoReducers,
	checkout: checkoutReducers,
	pedidos: pedidosReducers,
	retirada: retiradaReducers
})

export default rootReducer