import React, {Component} from 'react';
import {View, TextInput, Picker, FlatList} from 'react-native';
import {Row, Text, Item, ListItem, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TextInputMask} from 'react-native-masked-text';
import styles from '../Style';
import ErrorForm from '../../../Helpers/ErrorForm';
import {onChangeField, onChangeFieldPhone, phoneCompanies} from '../Actions';
import {RequestGet} from '../../../Helpers/Http';
import styleInput from '../../../StyleSheet/Input';
import styleButtons from '../../../StyleSheet/Buttons';

class DadosContato extends Component {

  constructor(props){
    super(props);
    
    this.state = {};
  }

  renderListaContatos = ({item, index}) => (
    <ListItem>
      <Text style={{color: '#656D82'}}>{item.number} | {item.phone_type_label}</Text>
    </ListItem>
  );

  render(){
    return (
      <View>
	 			<Row style={styles.title} >
		 			<Text style={styles.titleText}>Dados para contato</Text>
		 			<Icon style={styles.titleIconArrowDown} name='keyboard-arrow-down' />
	 			</Row>

        <View style={{ paddingBottom:20 }}>
          <FlatList
            data={this.props.telephones}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={this.renderListaContatos}
          />

          <View style={{paddingHorizontal: 15, paddingTop: 15}}>
            <Button block style={styleButtons.btnPrimaryOutline} onPress={() => {this.props.popupDialogContato.dialog.show()}}>
              <Text style={styleButtons.btnPrimaryOutlineText} >Cadastrar contato</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => (state.cadastro);
const mapDispatchToProps = dispatch => bindActionCreators({onChangeField, onChangeFieldPhone, phoneCompanies}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DadosContato);