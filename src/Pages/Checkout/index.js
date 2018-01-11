import React, { Component } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Container, Content, Button, Text, Row, ListItem, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormularioEntrega from './Components/FormularioEntrega';
import FormularioPagamento from './Components/FormularioPagamento';
import ResumoPedido from './Components/ResumoPedido';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { finalizarCadastro, getCart } from './Actions';
import styles from './Styles';
import stylesGlobal from '../../StyleSheet/Buttons';

export class Checkout extends Component {

  constructor(props){
    super(props);
    
  }

  btnFinalizarCadastro(){
    if(this.props.loading.btnFinalizarCadastro){
      return (<Spinner color='black' />);
    }else{
      return (
        <Button block style={stylesGlobal.btnPrimary} onPress={() => {this.props.finalizarCadastro(this.props)}}>
          <Text style={stylesGlobal.btnPrimaryText} >Finalizar Cadastro</Text>
        </Button>
      );
    }
  }

  componentWillMount(){
    this.props.getCart();
  }

  render(){
    return (
      <Container>
        <Content>
          <FormularioEntrega />
          <FormularioPagamento />
          <ResumoPedido />

          <View>
            <View style={styles.bottom}>
              {this.btnFinalizarCadastro()}

              <Button block style={[stylesGlobal.btnPrimaryOutline, {marginTop: 15}]} onPress={() => {this.props.navigation.goBack()}} >
                <Text style={stylesGlobal.btnPrimaryOutlineText} >Voltar</Text>
              </Button>
            </View>
          </View>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ finalizarCadastro, getCart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);