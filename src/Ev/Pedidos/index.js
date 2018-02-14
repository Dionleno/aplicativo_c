import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Text, Content, ListItem, Body, Right, Button, Icon } from 'native-base';
import HeaderEv from '../../Static/HeaderEv';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPedidos } from './Actions';
import styles from './Style';

class Pedidos extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.props.loadPedidos();
    
  }

  _keyExtractor = (item, index) => item.order;
  
  _renderItem = ({item}) => {
    const { address, price } = item;
    const endereco = `${address.street} - ${address.number}, ${address.city.name}, ${address.city.state.name}`; 
    
    return (
      <ListItem>
        <Body>
          <Text>{item.order}</Text>
          <Text note>{endereco}</Text>
        </Body>
        <Right>
          <Text note>R$ {price}</Text>
          <Button transparent info iconRight>
            <Icon name='md-open' />
          </Button>
        </Right>
      </ListItem>
    );
  }

  render(){
    return(
      <Container>
        <HeaderEv title='Lista de Pedidos' item={this.props} />

        <Content style={styles.content} >
          <FlatList
            data={this.props.pedidos}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </Content>

      </Container>
    );
  }

}

const mapStateToProps = state => (state.pedidos);
const mapDispatchToProps = dispatch => bindActionCreators({ loadPedidos }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);
