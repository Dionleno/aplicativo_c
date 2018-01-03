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

//Paginas internas
import Interna from './Pages/Interna';


//Paginas estaticas
import SideBar from './Static/SideBar'

/*
* @Rotas com sidebar (Auth, internas)
*/
export const DrawerNav =  DrawerNavigator({
    
   Interna: {
    screen: Interna,
    navigationOptions : {
      drawerLabel : 'Interna' 
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
    Home: {screen: Home} 
 },{
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions : {}
});

export default NavigatorRouter;