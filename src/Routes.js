/**
 * Contém1g App
 * @Routes page
 * @flow
 */

import React, { Component } from 'react';
import { Platform} from 'react-native';

import {DrawerNavigator, StackNavigator} from 'react-navigation';

//Paginas externas
import Home from './Pages/Home';
import Patrocinador from './Pages/Patrocinador';
import Cadastro from './Pages/Cadastro';
import Kits from './Pages/Kits';
import KitDatails from './Pages/Kits/Details'
import Confirmacao from './Pages/CadastroConfirmacao'
import Login from './Pages/Login';
import Carrinho from './Pages/Carrinho';
import Produto from './Pages/Produto';
import Categorias from './Pages/Produto/Categorias';
import ProdutoDetails from './Pages/Produto/Details';
import CupomAtivacao from './Pages/CupomAtivacao';
import CupomAgradecimento from './Pages/Agradecimentos/Cupom';
import CadastroAgradecimento from './Pages/Agradecimentos/Cadastro';
import Checkout from './Pages/Checkout';

//Paginas internas
import Interna from './Pages/Interna';


//Paginas estaticas
import SideBar from './Static/SideBar'

/*
* @Rotas com sidebar (Auth, internas)
*/
export const DrawerNav =  DrawerNavigator({
 
   Produto: {
    screen: Produto,
    navigationOptions : {
      drawerLabel : 'Produtos' 
    }
  },
  Categorias: {
    screen: Categorias,
    navigationOptions : {
      drawerLabel : 'Categorias' 
    } 
  },
  Logout: {
    screen: Home,
    navigationOptions : {
      drawerLabel : 'Sair' 
    }
  }    
 
}, {
  contentComponent: SideBar,
  drawerWidth: 300,
  drawerOpenRoute: 'DrawerOpen',  
  drawerCloseRoute: 'DrawerClose',  
  drawerToggleRoute: 'DrawerToggle'
});

/*
* @Rotas sem sidebar (Offline,Externas)
*/
const NavigatorRouter = StackNavigator({
  Drawer : {screen: DrawerNav},
  Home: {screen: Home},
  Login: {screen:Login},
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
  CadastroAgradecimento: {screen: CadastroAgradecimento}
},{
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions : {}
});

export default NavigatorRouter;