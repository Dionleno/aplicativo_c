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
import { selecionarFrete, cartaoTitular, cartaoNumero, cartaoCVV, setInstallmentId } from '../Actions';
import Ano from './Ano';
import Mes from './Mes';
import styleInput from '../../../StyleSheet/Input';
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
      <Form>
        <View style={styles.viewForm}>
          <Text style={styles.formLabel}>Nome do titular do cartão</Text>
          
          <TextInput
            style={styleInput.boxinput}
            underlineColorAndroid='transparent'
            onChangeText={value => this.props.cartaoTitular(value)}
            value={this.props.cartao.titular}
          />
        </View>

        <View style={styles.viewForm}>
          <Text style={styles.formLabel}>Número do cartão</Text>
          <TextInputMask
            style={styleInput.boxinput}
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
          <View style={[styles.viewForm, {flex: 2}]}>
            <Text style={styles.formLabel}>Código de segurança</Text>
            <TextInputMask
              style={styleInput.boxinput}
              type={'only-numbers'}
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={3}
              onChangeText={value => this.props.cartaoCVV(value)}
              value={this.props.cartao.cvv}
            />
          </View>
          <View style={[styles.viewForm, {flex: 1, alignItems: 'center'}]}>
            <Image source={CVV} style={{ width: 63, height: 42, marginTop: 35 }} />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.viewForm}>
            <Text style={styles.formLabel}>Validade</Text>
            <Mes />
          </View>

          <View style={styles.viewForm}>
            <Text style={styles.formLabel}> </Text>
            <Ano />
          </View>
        </View>
        
        <View style={styles.viewForm}>
          <Text style={styles.formLabel}>Parcelas</Text>
          
          <View style={styleInput.boxinput}>
            <Picker
              selectedValue={this.props.installment_id}
              onValueChange={value => this.props.setInstallmentId(value)}
              iosHeader='Selecione as parcelas' mode='dialog'>
              {this.parcelas()}
            </Picker>
          </View>
        </View>
      </Form>
    );
  }
}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ cartaoTitular, cartaoNumero, cartaoCVV, setInstallmentId }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FormularioCartaoCredito);