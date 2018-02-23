import React from 'react';
import { View } from 'react-native';
import { Header, Button, Body, Title, Right, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import styleDefault from '../../../StyleSheet/Buttons.js';
import styles from '../Style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cancelar } from '../Actions';

const header = props => (
  <Header androidStatusBarColor='#000000' style={{backgroundColor:'#333333'}}>
    <View style={styleDefault.boxBtnMenu}>
      <Button 
        transparent 
        onPress={() => {props.navigation.goBack()}}>
        <Icon name='keyboard-arrow-left' style={{fontSize:25,color:'#FFFFFF'}}/>
      </Button>
    </View> 
    <Body>
      <Title>Detalhes</Title>
    </Body>
    <Right>
      <Button transparent onPress={() => props.cancelar()} >
        <Text style={styles.dtHeaderCancelButton}>Cancelar</Text>
      </Button>
    </Right>
  </Header>
)

const mapStateToProps = state => (state.pedidos);
const mapDispatchToProps = dispatch => bindActionCreators({ cancelar }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(header);