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
import { getCart, cadastrarCartao } from './Actions';
import styles from './Styles';
import styleButtons from '../../StyleSheet/Buttons';
import FormularioCartaoCredito from './Components/FormularioCartaoCredito';
import PopupDialog, {DialogTitle, SlideAnimation, DialogButton } from 'react-native-popup-dialog';

export class Checkout extends Component {

  constructor(props){
    super(props);
    
  }
  
  verificaEntregaCd(){
    if(this.props.factory == 1){
      return (
        <View>
          <FormularioEntrega />
          <FormularioPagamento popupDialogCartao={this.popupDialogCartao} />
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

        <PopupDialog
          haveTitleBa={false}
          ref={(popupDialogCartao) => { this.popupDialogCartao = popupDialogCartao }}
          animationDuration={500}
          width={0.9}
          height={0.9}
          containerStyle={{zIndex: 10, elevation: 10}}
          actions={
            [
              <Button 
                key={0} 
                block 
                style={[styleButtons.btnPrimary, {marginHorizontal: 15, marginVertical: 15}]} 
                onPress={() => this.props.cadastrarCartao(this.popupDialogCartao)}>
                <Text style={styleButtons.btnPrimaryText}>Cadastrar Cartão</Text>
              </Button>
            ]
          }>
          <FormularioCartaoCredito />
        </PopupDialog>

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
const mapDispatchToProps = dispatch => bindActionCreators({ getCart, cadastrarCartao }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);