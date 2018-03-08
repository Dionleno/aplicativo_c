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
import MultPlatform from '../../MultPlatform'
const AnimatedTI = Animated.createAnimatedComponent(Item);

class HeaderProdutos extends Component {

  constructor(props){
    super(props);
  }

  render(){
    const { state } = this.props.item.navigation;

    return (
      <Header androidStatusBarColor="#000000" iosStatusbar="light-content" style={{backgroundColor: MultPlatform.BackgroundColorStatusBar}}>
  
        <View style={styleDefault.boxBtnMenu}>
          <Button transparent onPress={this.props.opendrawer}>
            <Icon name='menu' style={[styles.icon,{color:MultPlatform.TextColorStatusBar}]} />
          </Button>
        </View>
        
        <IF visible={!this.props.item.opensearch}>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right>
            <Button transparent style={this.props.item.visibleType == 1 ? styles.btnActive : {}} onPress={() => { this.props.item.changeDisplayTemplateProduto() }}>
              <Icon name='format-line-spacing' style={[styles.icon,{color:MultPlatform.TextColorStatusBar}]} />
            </Button> 
            <Button 
              transparent 
              onPress={() => this.props.item._onOpenInputSearch(this.props.item) }>
              <Icon name='search' style={[styles.icon,{color:MultPlatform.TextColorStatusBar}]} />
            </Button>
  
          </Right>
        </IF>
        <IF visible={this.props.item.opensearch}>
          <Body>
            <AnimatedTI style={{ height: 47, width: this.props.item.slideAnim, backgroundColor: '#FFFFFF', paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
              <Icon active name='close' onPress={() => this.props.item._onClosedInputSearch(this.props.item)} style={{ fontSize: 24, color: '#888888' }} />
              <Input
                style={styles.StyleInputText}
                autoFocus={true}
                keyboardType='web-search'
                returnKeyType="search"
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.props.item.searchRequestItem(this.props.item)}
                placeholder="Buscar..."
                onChangeText={(value) => this.props.item.changeItem('search', value)}
              />
              <Icon active name='search' style={{ fontSize: 24, color: '#888888' }} onPress={() => this.props.item.searchRequestItem(this.props.item)} />
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
    backgroundColor: "#B0A69B"
  }
});

export default HeaderProdutos;