import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Content, Container, Text, Spinner, ListItem, Body } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './Style';

class Dialog extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item.id;
  
  _renderItem = ({item}) => {
    return (
      <ListItem>
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
        <Text style={styles.dialogText}>Valor: {this.props.dialog.value}</Text>
        <Text style={styles.dialogText}>Status: {this.props.dialog.status}</Text>
        <Text style={styles.dialogText}>Produtos:</Text>
        <FlatList
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
      <Container>
        <Content style={styles.dialogContent}>
          {this.content()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => (state.pedidos);
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);