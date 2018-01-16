import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import { Content, Text, Item, Button } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../Style';
import styleButtons from '../../../StyleSheet/Buttons';
import { onChangeFieldPhone, loadPhoneCompanies, loadPhoneTypes, changePhoneNumber, changePhoneCompany, changePhoneType, cadastrarContato } from '../Actions';

class FormularioContato extends Component {
  
  constructor(props){
    super(props);

  }

  componentWillMount(){
    this.props.loadPhoneCompanies();
    this.props.loadPhoneTypes();
  }

  pickerPhoneCompanies(){
    return this.props.phone_companies.data.map(item => (
      <Picker.Item  key={item.id} label={item.name} value={item.id} />
    ));
  }

  pickerPhoneTypes(){
    return this.props.phone_types.data.map(item => (
      <Picker.Item  key={item.id} label={item.description} value={item.id} />
    ));
  }

  render() {
    return(
      <Content style={{paddingHorizontal: 15, paddingVertical: 15}}>
        <Item regular style={{backgroundColor:'#FFFFFF',height:50}}>
          <TextInputMask
            style={styles.StyleInputText}
            type={'cel-phone'}
            options={{ format: '(99) 99999-9999' }}
            underlineColorAndroid='transparent'  
            placeholder="Telefone" 
            value={this.props.phone_number}
            onChangeText={value => {this.props.changePhoneNumber(value)}}
          />
        </Item>

        <View style={{ backgroundColor: '#FFFFFF', height:50, marginLeft: 2 }}>
          <Picker
            selectedValue={this.props.phone_companies.selected}
            onValueChange={value => {this.props.changePhoneCompany(value)}}>
            <Picker.Item key="0" value="0" label="Operadora" />
            {this.pickerPhoneCompanies()}
          </Picker>
        </View>

        <View style={{backgroundColor: '#FFFFFF', height:50, marginLeft: 2}}>
          <Picker
            selectedValue={this.props.phone_types.selected}
            onValueChange={value => {this.props.changePhoneType(value)}}>
            <Picker.Item key="0" value="0" label="Tipo" />
            {this.pickerPhoneTypes()}
          </Picker>
        </View>

        <View style={{marginTop: 15}} >
          <Button block style={styleButtons.btnPrimary} onPress={() => this.props.cadastrarContato(this.props.popupDialogContato)}>
            <Text>Cadastrar</Text>
          </Button>
        </View>
        
      </Content>
    );
  }
}

const mapStateToProps = state => (state.cadastro);
const mapDispatchToProps = dispatch => bindActionCreators({ onChangeFieldPhone, loadPhoneCompanies, loadPhoneTypes, changePhoneNumber, changePhoneCompany, changePhoneType, cadastrarContato }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FormularioContato);