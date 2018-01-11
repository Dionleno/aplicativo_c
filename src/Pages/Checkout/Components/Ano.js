import React, { Component } from 'react';
import { Picker, View, Text } from 'react-native';
import styleInput from '../../../StyleSheet/Input';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {cartaoAno} from '../Actions';

class Ano extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  pickerItem() {
    let incio = new Date().getFullYear();
    let fim = incio+10;
    let ano = [];

    for(i = incio; i <= fim; i++){
      ano.push(i.toString());
    }

    return ano.map(val => <Picker.Item key={val} label={val} value={val} />);
  }

  render() {
    return (
      <View style={[styleInput.boxinput, {backgroundColor: '#f1f1f1'}]}>
        <Picker
          selectedValue={this.props.cartao.ano}
          onValueChange={value => this.props.cartaoAno(value)}
          iosHeader='Selecione o ano de vencimento' mode='dialog'>
          { this.pickerItem() }
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ cartaoAno }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Ano);
