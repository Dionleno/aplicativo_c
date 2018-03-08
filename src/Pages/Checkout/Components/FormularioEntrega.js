import React, { Component } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import {
  Card, 
  CardItem, 
  Body,
  Text,
  Radio,
  Row,
  Spinner,
  Content,
  Button,
  ListItem
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../Styles';
import { RequestAuth } from '../../../Helpers/Http';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MaskService } from 'react-native-masked-text';
import { listarEnderecosEntrega, listarFormasEntrega, selecionarFrete, setAddressId } from '../Actions';
import RadioPlataform from '../../../RadioPlataform'

export class FormularioEntrega extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: {
        endereco: [],
        entrega: []
      }
    };
  }

  checkItemEndereco(index) {
    let endereco = this.state.checked.endereco;
    
    for(let i=0; i<endereco.length; i++){
      endereco[i] = false;
    }

    endereco[index] = true;

    this.setState({ checked: {...this.state.checked, endereco} }, () => {
      this.props.setAddressId(this.props.enderecos[index].id);
      this.props.listarFormasEntrega(this.props.enderecos[index].zip);
    });
  }

  checkItemFrete = index => {
		let entrega = this.state.checked.entrega;
    
    for(let i=0; i<entrega.length; i++){
			entrega[i] = false;
		}
    
    entrega[index] = true;
    
		this.setState({ checked: {...this.state.checked, entrega} }, () => {
      this.props.selecionarFrete(index);
		});
	}

  _renderItemEnderecos = ({item, index}) => (
    <Card style={styles.cardEndereco} >
      <CardItem>
        <Body>
          <View style={styles.viewRadioEndereco} >
                <RadioPlataform 
                  actionClick={() => this.checkItemEndereco(index)}
                  selected={this.state.checked.endereco[index]}
                  styles={styles.radio}
                 /> 
            <Text style={styles.radioText} >{item.description}</Text>
          </View>

          <Text style={[styles.radioText, {marginLeft: 30,fontSize:12}]}>{item.street} - {item.number}</Text>
          <Text style={[styles.radioText, {marginLeft: 30,fontSize:12}]}>CEP {item.zip}</Text>
        </Body>
      </CardItem>
    </Card>
  )

  _renderItemFormaEntrega = ({item, index}) => {
    let price = MaskService.toMask('money', item.price, {
      unit: 'R$',
      separator: ',',
      delimiter: '.'
    });

    return (
      <ListItem style={styles.viewRadio}>
         <RadioPlataform 
                  actionClick={() => this.checkItemFrete(index)}
                  selected={this.state.checked.entrega[index]}
                  styles={styles.radio}
                 /> 
         
        <Text style={styles.radioText}>{(item.type).toUpperCase()} - {price}</Text>
      </ListItem>
    );
  }
  
  loadingItemEnderecos() {
    if(this.props.enderecos.length == 0){
      return (<Spinner color='black' />);
    }
  }

  infoItemFormaEntrega(){
    if(this.props.loading.formasEntrega == 0){
      return (
        <Text style={[styles.radioText, {textAlign: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10}]}>Selecione o endereço acima para listar as formas de entrega</Text>
      );
    }

    if(this.props.loading.formasEntrega == 1){
      return (
        <Spinner color='black' />
      );
    }
  }

  componentWillMount() {
    this.props.listarEnderecosEntrega();
  }

  render() {
    return (
      <View>
        <View>
          <Row style={styles.title} >
            <Text style={styles.titleText}>Endereço de entrega</Text>
          </Row>
        </View>
        
        {this.loadingItemEnderecos()}

        <FlatList 
          keyExtractor={(item, index) => index}
          renderItem={this._renderItemEnderecos}
          data={this.props.enderecos}
          extraData={this.state}
        />

        <View>
          <Row style={styles.title} >
            <Text style={styles.titleText}>Forma de entrega</Text>
          </Row>
        </View>

        {this.infoItemFormaEntrega()}

        <FlatList
          data={this.props.formas_entrega}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItemFormaEntrega}
          extraData={this.state}
        />

      </View>
    );
  }

}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ listarEnderecosEntrega, listarFormasEntrega, selecionarFrete, setAddressId }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FormularioEntrega);