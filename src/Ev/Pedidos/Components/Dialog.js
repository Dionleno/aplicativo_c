import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Content, Container, Text, Spinner, ListItem, Body, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../Style';
import buttons from '../../../StyleSheet/Buttons';

class Dialog extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item.id;
  
  _renderItem = ({item}) => {
    return (
      <ListItem style={{backgroundColor: 'rgba(0,0,0,0 )'}}>
        <Body>
          <Text>{item.detail.product.name}</Text>
        </Body>
      </ListItem>
    );
  }

  content = () => {
    if(!this.props.dialog.visible){
      return (<Spinner color='black' />);
    }

    return (
      <View>
        <Text style={styles.dialogText}>Código: {this.props.dialog.order}</Text>
        <Text style={styles.dialogText}>Endereço: {this.props.dialog.address}</Text>
        <Text style={styles.dialogText}>Ciclo: {this.props.dialog.cycle}</Text>
        <Text style={styles.dialogText}>Valor: {this.props.dialog.value}</Text>
        <Text style={styles.dialogText}>Status: {this.props.dialog.status}</Text>
        <Text style={styles.dialogText}>Entrega</Text>
        <View style={styles.dtListaProdutos}>
          <ListItem style={{backgroundColor: 'rgba(0,0,0,0)'}}>
            <Body>
              <Text>Empresa: {this.props.dialog.shipping_company.name}</Text>
            </Body>
          </ListItem>
          <ListItem style={{backgroundColor: 'rgba(0,0,0,0)'}}>
            <Body>
              <Text>Valor: {this.props.dialog.shipping}</Text>
            </Body>
          </ListItem>
          <ListItem style={{backgroundColor: 'rgba(0,0,0,0)'}}>
            <Body>
              <Button style={buttons.btnPrimaryOutline} full>
                <Text style={buttons.btnPrimaryOutlineText}>Rastrear Pedido</Text>
              </Button>
            </Body>
          </ListItem>
        </View>
        <Text style={styles.dialogText}>Produtos</Text>
        <FlatList
          style={styles.dtListaProdutos}
          data={this.props.dialog.products}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

  render(){
    return (
      <Container style={{marginBottom: 100}}>
        {this.content()}
      </Container>
    );
  }
}

const mapStateToProps = state => (state.pedidos);
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);