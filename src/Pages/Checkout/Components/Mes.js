import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styleInput from '../../../StyleSheet/Input';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {cartaoMes} from '../Actions';
import {Picker} from "native-base"
class Mes extends Component {

  constructor(props) {
    super(props);
  }

  pickerItem() {
    const mes = [
      {key: 1, label: 'Janeiro'},
      {key: 2, label: 'Fevereiro'},
      {key: 3, label: 'Março'},
      {key: 4, label: 'Abril'},
      {key: 5, label: 'Maio'},
      {key: 6, label: 'Junho'},
      {key: 7, label: 'Julho'},
      {key: 8, label: 'Agosto'},
      {key: 9, label: 'Setembro'},
      {key: 10, label: 'Outubro'},
      {key: 11, label: 'Novembro'},
      {key: 12, label: 'Dezembro'},
    ];

    return mes.map(val => <Picker.Item key={val.key} label={val.label} value={val.key} />);
  }

  render() {
    return (
      <View style={styleInput.picker}>
       <Picker
          iosHeader="Mês"
          headerBackButtonText="Voltar"
          mode="dialog"
          { ...this.props }
          placeholder="Mês"
          selectedValue={this.props.cartao.mes}
          onValueChange={value => this.props.cartaoMes(value)}>
          { this.pickerItem() }
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({cartaoMes}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Mes);