import React, { Component } from 'react';
import {AppRegistry,TouchableOpacity} from 'react-native';
import {Text,Container} from 'native-base';
import LsProdutos from '../../Components/produtos';
import HeaderProdutos from '../../Static/HeaderProdutos';
import EvDrawer from '../../Components/Drawers/EvDrawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Pedidos extends Component{
  constructor(props) {
    super(props); 
  }

  render(){
    return(
      <Container>
        <EvDrawer ref="evDrawer">
          <HeaderProdutos
            item={this.props}
            opendrawer={() => this.refs.evDrawer.openDrawer()}
            title="Novo pedido" />

          <LsProdutos />
        </EvDrawer>
      </Container>      
    )
  }
}

 
