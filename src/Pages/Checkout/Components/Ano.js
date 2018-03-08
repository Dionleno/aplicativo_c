import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styleInput from '../../../StyleSheet/Input';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {cartaoAno} from '../Actions';
import {Picker} from "native-base"
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
      <View style={styleInput.picker}>
       <Picker
          iosHeader="Ano"
          headerBackButtonText="Voltar"
          mode="dialog"
          { ...this.props }
          placeholder="Ano"
          selectedValue={this.props.cartao.ano}
          onValueChange={value => this.props.cartaoAno(value)}>
            { this.pickerItem() }
        </Picker>
        
      </View>
    );
  }
}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ cartaoAno }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Ano);
