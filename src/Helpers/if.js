import React, { Component } from 'react';
import {
  Platform,
  View,
  Image
} from 'react-native';

export default props => {
	if(props.visible == true){
      return props.children
	}else{
		return false
	}
}
