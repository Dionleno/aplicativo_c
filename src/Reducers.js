/**
 * Contém1g App
 * @Routes de reducer
 * @flow
 */

import {combineReducers} from 'redux'
import homeReducers from './Pages/Home/Reducers'

const rootReducer = combineReducers({
	home: homeReducers 
})

export default rootReducer