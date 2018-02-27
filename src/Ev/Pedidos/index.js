import React, { Component } from 'react';
import {AppRegistry,TouchableOpacity} from 'react-native';
import {Text, Container,Row,Col} from 'native-base';
import LsProdutos from '../../Components/Produtos';
import HeaderProdutos from '../../Static/HeaderProdutos';
import EvDrawer from '../../Components/Drawers/EvDrawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';

class Pedidos extends Component{
  constructor(props) {
    super(props)
  }
  
  render(){
    return(
      <Container>
        <EvDrawer ref="evDrawer">
          <HeaderProdutos
            item={this.props}
            opendrawer={() => this.refs.evDrawer.openDrawer()}
            title="Pedidos" />

                <Row style={{padding:5}}>
                    <Col>
                      <LsProdutos />
                    </Col>
                </Row>
        </EvDrawer>
      </Container>      
    )
  }
}

export default withNavigation(Pedidos);
