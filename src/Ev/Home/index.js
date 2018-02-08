import React, { Component } from 'react';
import { Content, Container, Text } from 'native-base';
import HeaderEv from '../../Static/HeaderEv';
import styles from './Style';

export default class HomeEv extends Component {

  constructor(props){
    super(props);
    
  }

  render(){
    return (
      <Container>
        <HeaderEv item={this.props} />
        
        <Content style={styles.container}>
          <Text style={{alignSelf:'center', marginTop: 25}}>Bem-vindo(a), ao Escritório Virtual</Text>
        </Content>
      </Container>
    );
  }

}