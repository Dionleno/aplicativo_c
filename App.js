/**
 * Contém1g App
 * Stated app
 * @flow
 */
 
import React, { Component } from 'react';
import { Platform } from 'react-native';

/*
* @Importar as depencias do redux
* @createStore para criar o armazenamento de todas as propriedades de estado
* @Provider componente responsavel de passar as propriedades para os componentes filhos
*/
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux' 
import promise from 'redux-promise'
import thunk from 'redux-thunk'

/*
* @Route todas as rotas do app
* @Reducers todos os reducers do app
*/
import Route from './src/Routes';
import Reducers from './src/Reducers'


const store = applyMiddleware(thunk,promise)(createStore)(Reducers)

export default class App extends Component<{}> {
  render() {
    return (<Provider store={store}><Route /></Provider>)
  }
}
 
 