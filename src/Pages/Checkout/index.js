import React, { Component } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Container, Content, Button, Text, Row, ListItem, Spinner } from 'native-base';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormularioEntrega from './Components/FormularioEntrega';
import FormularioPagamento from './Components/FormularioPagamento';
import ResumoPedido from './Components/ResumoPedido';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderCheckout from '../../Static/HeaderCheckout';
import { getCart } from './Actions';
import styles from './Styles';
import stylesGlobal from '../../StyleSheet/Buttons';

export class Checkout extends Component {

  constructor(props){
    super(props);
    
  }

  verificaEntregaCd(){
    if(this.props.factory == '1'){
      return (
        <View>
          <FormularioEntrega />
          <FormularioPagamento />
        </View>
      );
    }
  }

  carregarPedido(){
    if(this.props.factory == -1){
      return (<Spinner color='black' />);
    }else{
      return (<ResumoPedido navigation={this.props.navigation} />);
    }
  }

  componentWillMount(){
    this.props.getCart();
  }

  render(){
    return (
      <Container>
        <HeaderCheckout navigation={this.props.navigation} />
        <Content style={{backgroundColor: '#FFFFFF'}}>
          {this.verificaEntregaCd()}
          {this.carregarPedido()}
        </Content>
        <SpinnerOverlay visible={this.props.overlay} textContent={"Aguarde..."} textStyle={{color: '#FFF'}} />
      </Container>
    );
  }
}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ getCart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);