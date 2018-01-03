/**
 * Contém1g App
 * @Pagina modelo Interna
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  View,
  Image,
  Dimensions,
  Content
} from 'react-native';

import { StyleProvider, Container, Button,Text,Header} from 'native-base';
 

export default class Interna extends Component {

  render() {

    return (

          <Container >
            <Header />

             <Text>Interna</Text>
              <Button block dark style={{marginTop:30}} onPress={() => this.props.navigation.navigate('Home')}>
               <Text>Home</Text>
             </Button>
         </Container>

    )
  }
}
