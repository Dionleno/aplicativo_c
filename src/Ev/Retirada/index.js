import React, { Component } from 'react';
import { Container, Content, Text, Radio, ListItem, Button, Spinner } from 'native-base';
import { View, FlatList } from 'react-native';
import HeaderEv from '../../Static/HeaderEv';
import styles from './Style';
import buttons from '../../StyleSheet/Buttons';
import input from '../../StyleSheet/Input';
import EvDrawer from '../../Components/Drawers/EvDrawer';
import FormularioCD from './FormularioCD';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { avancar, check, verificarCarrinhoAtivo } from './Actions';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

class Retirada extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  componentWillMount(){
    this.props.verificarCarrinhoAtivo(this.props.navigation);
  }
  
  _keyExtractor = (item) => item.id; 

  _renderItem = ({item, index}) => {
    return (
      <ListItem>
        <View style={styles.radio}>
          <Radio 
            onPress={() => {this.props.check(index)}}
            selected={item.selected} />
        </View>
        <Text>{item.label}</Text>
      </ListItem>
    );
  }

  formularioCD = () => {
    if(this.props.cd.visible == 2){
      return (<Spinner color='black' />);
    }

    if(this.props.cd.visible == 1){
      return (<FormularioCD />);
    }
  }

  button = () => {
    if(this.props.loading){
      return (<Spinner color='black' />);
    }

    return (
      <Button style={buttons.btnPrimary} onPress={() => this.props.avancar(this.props)} full>
        <Text style={buttons.btnPrimaryText}>Avançar</Text>
      </Button>
    );
  }

  render(){
    return (
      <Container>
        <EvDrawer ref='evDrawer' >
          <HeaderEv 
            item={this.props}
            opendrawer={() => this.refs.evDrawer.openDrawer()}
            title="Modo de Retirada" />

          <Content style={styles.content}>
            <FlatList 
              style={styles.lista}
              data={this.props.options}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />

            {this.formularioCD()}

            <Text style={styles.errorText}>{this.props.error}</Text>

          </Content>

          <View style={styles.footer}>
            {this.button()}
          </View>

          <SpinnerOverlay visible={this.props.overlay} textContent={"Aguarde..."} textStyle={{color: '#ffffff'}} />
      
        </EvDrawer>
      </Container>
    );
  }
}

const mapStateToProps = state => (state.retirada);
const mapDispatchToProps = dispatch => bindActionCreators({ avancar, check, verificarCarrinhoAtivo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Retirada);