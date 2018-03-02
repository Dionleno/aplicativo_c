/**
 * Contem1g App
 * @Pagina Header Header Externo
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, TouchableHighlight, StyleSheet, View,Animated } from 'react-native';

import { Header, Left, Button, Body, Title, Right, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleDefault from '../../StyleSheet/Buttons';
import IF from '../../Helpers/if';
import { preto, preto_0 } from '../../StyleSheet/Cores';

const AnimatedTI = Animated.createAnimatedComponent(Item);

class HeaderProdutos extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    
  }

  botaoMenu = () => {
    let menu = this.props.menu || false;

    if(menu){
      return (
        <Button transparent onPress={this.props.opendrawer}>
          <Icon name='menu' style={styles.icon} />
        </Button>
      );
    }
  }

  render(){
    const { props } = this;
    const { state } = props.item.navigation;

    return (
      <Header androidStatusBarColor={preto} style={styles.header}>
  
        <View style={styleDefault.boxBtnMenu}>
          {this.botaoMenu()}
        </View>
        
        <IF visible={!props.item.opensearch}>
          <Body>
            <Title>{props.title}</Title>
          </Body>
          <Right>
            <Button transparent style={props.item.visibleType == 1 ? styles.btnActive : {}} onPress={() => { props.item.changeDisplayTemplateProduto() }}>
              <Icon name='format-line-spacing' style={styles.icon} />
            </Button>
            <Button transparent onPress={() => props.item._onOpenInputSearch(props.item)}>
              <Icon name='search' style={styles.icon} />
            </Button>
  
          </Right>
        </IF>
        <IF visible={props.item.opensearch}>
          <Body>
            <AnimatedTI style={{ height: 47, width: props.item.slideAnim, backgroundColor: '#FFFFFF', paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
              <Icon active name='close' onPress={() => props.item._onClosedInputSearch(props.item)} style={{ fontSize: 24, color: '#888888' }} />
              <Input
                style={styles.StyleInputText}
                autoFocus={true}
                keyboardType='web-search'
                returnKeyType="search"
                underlineColorAndroid='transparent'
                onSubmitEditing={() => props.item.searchRequestItem(props.item)}
                placeholder="Buscar..."
                onChangeText={(value) => props.item.changeItem('search', value)}
              />
              <Icon active name='search' style={{ fontSize: 24, color: '#888888' }} onPress={() => props.item.searchRequestItem(props.item)} />
            </AnimatedTI>
          </Body>
        </IF>
  
      </Header>
  
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: preto_0,
  },
  icon: {
    fontSize: 22,
    color: '#FFFFFF'
  },
  btnActive: {
    backgroundColor: "#000000"
  }
});

export default HeaderProdutos;