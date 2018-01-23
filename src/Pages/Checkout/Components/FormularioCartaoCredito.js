import React, { Component } from 'react';
import { TextInput, View, Image, FlatList, Picker } from 'react-native';
import {
  Container,
	Text,
	Row,
	Col,
	Item,
	Content,
	Form,
	Button,
	Radio,
	Right,
	Left,
	List,
	ListItem,
	Spinner
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  selecionarFrete, 
  cartaoTitular, 
  cartaoNumero, 
  cartaoCVV, 
  cartaoTotal,
  setInstallmentId, 
  calcularParcelas,
  verificarValorCartao
} from '../Actions';
import Ano from './Ano';
import Mes from './Mes';
import styleInput from '../../../StyleSheet/Input';
import styleButtons from '../../../StyleSheet/Buttons';
const CVV = require('../../../Images/cvv.png');

export class FormularioCartaoCredito extends Component {

  constructor(props){
    super(props);
  }

  parcelas() {
	  return this.props.parcelas.map(item => <Picker.Item key={item.key} label={item.label} value={item.key} />);
  }

  render() {
    return (
      <Content style={{paddingHorizontal: 15, paddingTop: 15, paddingBottom: 30}}>
        <View style={{marginBottom: 15}}>
          <TextInput
            style={styleInput.inputText}
            underlineColorAndroid='transparent'
            placeholder='Nome do titular do cartão'
            onChangeText={value => this.props.cartaoTitular(value)}
            value={this.props.cartao.titular}
          />
        </View>

        <View style={{marginBottom: 15}}>
          <TextInputMask
            style={styleInput.inputText}
            placeholder='Número do cartão'
            options={{
              format: '9999 9999 9999 9999'
            }}
            type={'credit-card'}
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            maxLength={19}
            onChangeText={value => this.props.cartaoNumero(value)}
            value={this.props.cartao.numero}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{marginBottom: 15, flex: 2}}>
            <TextInputMask
              style={styleInput.inputText}
              type={'only-numbers'}
              placeholder='Código de segurança'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={3}
              onChangeText={value => this.props.cartaoCVV(value)}
              value={this.props.cartao.cvv}
            />
          </View>

          <View style={{marginBottom: 15, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={CVV} width={50} height={50} />
          </View>
        </View>

        <View>
          <Text style={styles.formLabel}>Validade</Text>
        </View>
        
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <View style={{marginRight: 5, flex: 1}}>
            <Mes />
          </View>
          <View style={{marginLeft: 5, flex: 1}}>
            <Ano />
          </View>
        </View>

        <View style={{marginBottom: 10}} >
          <Text style={styles.formLabel}>Valor a ser cobrado neste cartão</Text>
          <TextInputMask
            style={styleInput.inputText}
            type={'money'}
            placeholder='Digite o valor a ser cobrado neste cartão'
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            onBlur={() => this.props.verificarValorCartao()}
            onChangeText={value => this.props.cartaoTotal(value)}
            value={this.props.cartao.total}
          />
        </View>

        <View style={{marginBottom: 100}}>
          <Text style={styles.formLabel}>Parcelas</Text>
          
          <View style={styleInput.picker}>
            <Picker
              selectedValue={this.props.cartao.installment_id}
              onValueChange={value => this.props.setInstallmentId(value)}
              iosHeader='Selecione as parcelas' mode='dialog'>
              {this.parcelas()}
            </Picker>
          </View>
        </View>
      </Content>
    );
  }
}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators(
  { 
    cartaoTitular, 
    cartaoNumero, 
    cartaoCVV, 
    setInstallmentId,
    cartaoTotal,
    calcularParcelas,
    verificarValorCartao
  }, 
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(FormularioCartaoCredito);