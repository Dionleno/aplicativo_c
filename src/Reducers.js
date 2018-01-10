/**
 * Contém1g App
 * @Routes de reducer
 * @flow
 */

import {combineReducers} from 'redux'
import homeReducers from './Pages/Home/Reducers'
import patrocionadorReducers from './Pages/Patrocinador/Reducers'
import cadastroReducers from './Pages/Cadastro/Reducers'
import kitsReducers from './Pages/Kits/Reducers'
import confirmeReducers from './Pages/CadastroConfirmacao/Reducers'
import loginReducers from './Pages/Login/Reducers'
import produtoReducers from './Pages/Produto/Reducers'

const rootReducer = combineReducers({
	home: homeReducers,
	login:loginReducers,
	patrocionador: patrocionadorReducers,
	cadastro: cadastroReducers,
	kits: kitsReducers,
	confirmacao: confirmeReducers,
	produto:produtoReducers
})

export default rootReducer