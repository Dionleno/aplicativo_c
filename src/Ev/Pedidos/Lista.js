import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { 
  Content,
  Container, 
  Text, 
  ListItem, 
  Body, 
  Right, 
  Spinner
} from 'native-base';
import HeaderEv from '../../Static/HeaderEv';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPedidos, dialog } from './Actions';
import styles from './Style';
import { MaskService } from 'react-native-masked-text';
import { MOEDAS } from '../../Helpers/Constants';
import EvDrawer from '../../Components/Drawers/EvDrawer';

class Lista extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.loadPedidos();
  }
  
  _keyExtractor = (item, index) => item.order;
  
  _renderItem = ({item}) => {
    const { address, price, order } = item;
    const endereco = `${address.street} - ${address.number}, ${address.city.name}, ${address.city.state.name}`; 
    const valor = MaskService.toMask('money', price, MOEDAS.BLR);

    return (
      <ListItem style={styles.item} onPress={() => this.openDialog(order)}>
        <Body>
          <Text>{item.order}</Text>
          <Text note>{endereco}</Text>
        </Body>
        <Right>
          <Text note>{valor}</Text>
        </Right>
      </ListItem>
    );
  }

  loading = () => {
    if(this.props.loading){
      return (<Spinner color='black' />);
    }
  }

  openDialog = order => {
    this.props.dialog(order);
    this.props.navigation.navigate('PedidoDetalhes');
  }

  render(){
    return(
      <Container>
        <EvDrawer ref="evDrawer">
          <HeaderEv
            item={this.props}
            opendrawer={() => this.refs.evDrawer.openDrawer()} 
            title='Lista de Pedidos' />

          <Content style={styles.content} >
            {this.loading()}
            <FlatList
              data={this.props.pedidos}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </Content>
        </EvDrawer>
      </Container>
    );
  }
}

const mapStateToProps = state => (state.pedidos);
const mapDispatchToProps = dispatch => bindActionCreators({ loadPedidos, dialog }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Lista);