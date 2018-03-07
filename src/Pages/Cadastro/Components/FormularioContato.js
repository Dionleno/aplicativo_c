import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Text, Item, Button,CheckBox , Picker} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../Style';
import styleButtons from '../../../StyleSheet/Buttons';

import Icon from 'react-native-vector-icons/Ionicons';
import styleInput from '../../../StyleSheet/Input';
import IF from '../../../Helpers/if';
import { onChangeFieldPhone,onChangeField, loadPhoneCompanies, loadPhoneTypes, changePhoneNumber, changePhoneCompany, changePhoneType, cadastrarContato } from '../Actions';

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
      <Content style={{ paddingHorizontal: 15, paddingVertical: 15}}>
       
        <TextInputMask
          style={styleInput.inputText}
          type={'cel-phone'}
          options={{ format: '(99) 99999-9999' }}
          underlineColorAndroid='transparent'  
          placeholder="Telefone" 
          returnKeyType={'next'}
          value={this.props.phone_number}
          onChangeText={value => {this.props.changePhoneNumber(value)}}
        />
       <View style={[styleInput.picker, {marginVertical: 15}]}>
        <Picker
              iosHeader="Operadoras"
              headerBackButtonText="Voltar"
              mode="dropdown"
              { ...this.props }
              placeholder="Operadoras"
              selectedValue={this.props.phone_companies.selected}
              onValueChange={value => {this.props.changePhoneCompany(value)}}>
               {this.pickerPhoneCompanies()}
            </Picker>
          
        </View>
 

        <View style={styleInput.picker}>
          <Picker
            iosHeader="Tipo"
            headerBackButtonText="Voltar"
            mode="dropdown"
            { ...this.props }
            placeholder="Tipo"
            selectedValue={this.props.phone_types.selected}
            onValueChange={value => {this.props.changePhoneType(value)}}>
          
            {this.pickerPhoneTypes()}
          </Picker>
        </View>
          
        <IF visible={this.props.phone_types.selected == 1}> 
        <View style={{marginVertical: 15,flexDirection: 'row',}}>
            <CheckBox color='black' checked={this.props.whatsappset} onPress={() => this.props.onChangeField(!this.props.whatsappset,'whatsappset')} />
            <Icon name='logo-whatsapp' style={{fontSize:20,marginLeft:20,marginRight:3}} />
            <Text>Whatsapp</Text>
        </View>
         </IF>
      </Content>
    );
  }
}

const mapStateToProps = state => (state.cadastro);
const mapDispatchToProps = dispatch => bindActionCreators({ onChangeFieldPhone, loadPhoneCompanies,onChangeField, loadPhoneTypes, changePhoneNumber, changePhoneCompany, changePhoneType, cadastrarContato }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FormularioContato);