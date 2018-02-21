import React, { Component } from 'react';
import { View } from 'react-native';
import { Picker, Spinner } from 'native-base';
import input from '../../StyleSheet/Input';
import styles from './Style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeField, carregarCDs } from './Actions';

class FormularioCD extends Component {

  constructor(props){
    super(props);
  }

  estados = () => this.props.cd.states.map(s => <Picker.Item key={s.id} value={s.id} label={s.name} />);

  cds = () => this.props.cd.cds.map(s => <Picker.Item key={s.id} value={s.id} label={s.name} />);

  selecionarEstado = value => {
    this.props.changeField('estado', value);
    this.props.carregarCDs(value);
  }

  pickerCD = () => {
    if(!this.props.cd.picker_cd_visible){
      return (<Spinner color='black' />);
    }

    return (
      <View style={[input.picker, styles.picker]}>
        <Picker
          selectedValue={this.props.form.cd}
          onValueChange={value => this.props.changeField('cd', value)}>
          <Picker.Item key={0} value={0} label='CD' />
          {this.cds()}
        </Picker>
      </View>
    );
  }

  render(){
    return (
      <View style={styles.cd}>
        <View style={[input.picker, styles.picker]}>
          <Picker
            selectedValue={this.props.form.estado}
            onValueChange={value => this.selecionarEstado(value)}>
            <Picker.Item key={0} value={0} label='Estado' />
            {this.estados()}
          </Picker>
        </View>
        
        {this.pickerCD()}
        
      </View>
    );
  }

}

const mapStateToProps = state => (state.retirada);
const mapDispatchToProps = dispatch => bindActionCreators({ changeField, carregarCDs }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FormularioCD);