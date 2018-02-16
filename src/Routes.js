/**
 * Contém1g App
 * @Routes page
 * @flow
 */

import React, { Component } from 'react';
import { Platform,Animated ,Easing} from 'react-native';

import {DrawerNavigator, StackNavigator} from 'react-navigation';

//Paginas externas
import Home from './Pages/Home';
import Patrocinador from './Pages/Patrocinador';
import Cadastro from './Pages/Cadastro';
import Kits from './Pages/Kits';
import KitDatails from './Pages/Kits/Details'
import Confirmacao from './Pages/CadastroConfirmacao'
import Login from './Pages/Login';
import Logado from './Pages/Login/Logado';
import Carrinho from './Pages/Carrinho';
import Produto from './Pages/Produto';
import Pedidos from './Ev/Pedidos';
import Categorias from './Pages/Produto/Categorias';
import ProdutoDetails from './Pages/Produto/Details';
import CupomAtivacao from './Pages/CupomAtivacao';
import CupomAgradecimento from './Pages/Agradecimentos/Cupom';
import CadastroAgradecimento from './Pages/Agradecimentos/Cadastro';
import Checkout from './Pages/Checkout';
import AguardandoAtivacao from './Pages/AguardandoAtivacao';

//Rotas EV
import HomeEv from './Ev/Home';

// Paginas internas
import Interna from './Pages/Interna';

// Paginas estaticas
import SideBar from './Static/SideBar';

// Paginas do EV 
import SideBarEv from './Static/SideBarEv';
 
/*
* @Rotas sem sidebar (Offline,Externas)
*/
const NavigatorRouter = StackNavigator({
  Produto: {screen: Produto},
  Categorias: {screen: Categorias},
  Home: {screen: Home},
  Login: {screen:Login},
  Logado:{screen:Logado},
  Patrocinador: {screen: Patrocinador},
  Cadastro: {screen:Cadastro} ,
  Kits: {screen:Kits},
  KitDatails:{screen:KitDatails},
  Confirmacao:{screen:Confirmacao},
  Carrinho: {screen: Carrinho},
  ProdutoDetails:{screen:ProdutoDetails},
  CupomAtivacao: {screen:CupomAtivacao} ,
  CupomAgradecimento:{screen:CupomAgradecimento},
  Checkout: {screen: Checkout},
  CadastroAgradecimento: {screen: CadastroAgradecimento},
  AguardandoAtivacao: {screen: AguardandoAtivacao},
  Pedidos: {screen: Pedidos},
  HomeEv:{screen:HomeEv}
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions : {}
});

export default NavigatorRouter;