import React, { Component } from 'react';
import { Platform, AsyncStorage,Alert } from 'react-native';

import {RequestPostAuth,ApiStatusCode,RequestGetAuth,RequestGet,RequestPost,doLogin} from '../../Helpers/Http' 

 export const changeIsCart = (_value) => ({
		 type:'CHANGE_ITEM_CART',
		 payload: _value	 
})