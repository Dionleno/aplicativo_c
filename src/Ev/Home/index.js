import React, { Component } from 'react';
import { Content, Container, Text } from 'native-base';
import HeaderEv from '../../Static/HeaderEv';
import styles from './Style';
import EvDrawer from '../../Components/Drawers/EvDrawer'

export default class HomeEv extends Component {

  constructor(props){
    super(props);
    
  }

  render(){
    return (
      <Container>
        <EvDrawer ref="evDrawer">
                 <HeaderEv
                    item={this.props}
                    opendrawer={() => this.refs.evDrawer.openDrawer()}
                    title="Escritório Virtual" />
        
                  <Content style={styles.container}>
                    <Text style={{alignSelf:'center', marginTop: 25}}>Bem-vindo(a), ao Escritório Virtual</Text>
                  </Content>
        </EvDrawer>
      </Container>
    );
  }

}