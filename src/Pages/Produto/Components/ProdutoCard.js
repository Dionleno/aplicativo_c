import React, { Component } from 'react';
import { AppRegistry, View, Image, FlatList, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Button, Container, Text, Header, Spinner, Card, CardItem, Body, Left, Right, Row, Col } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MOEDAS } from '../../../Helpers/Constants';
import { MaskService } from 'react-native-masked-text';
import { SEM_FOTO } from '../../../Helpers/Constants';

export const ProdutoCard  = props => {
    let item = props.item;
    let details = props.item.product_details[0];
    let img = SEM_FOTO;

    try{
      img = details.medias[0].url;
    } catch (e) {}
    
    let price = 0;
    try {
      price = details.prices[0].value;
    } catch (e) {}

    let preco = MaskService.toMask('money', price, MOEDAS.BLR);

    return (
      <Row style={styles.row} onPress={ () => {props.propriedades.navigation.navigate('ProdutoDetalhes', {produto:item}) }}>
        <Col style={styles.viewImage}>
          <Image source={{ uri:img }} style={styles.imageProduct} />
        </Col>

        <Col style={styles.viewProductDetails}>
          <Icon name="visibility" style={{alignSelf:'flex-end',fontSize:20, color: '#20CDA6',}}/>
          <View style={styles.viewProductTitle}>
            <Text style={styles.productTitle}>{item.name}</Text>
          </View>
          <View style={styles.viewProductPoints}>
            <Text style={styles.productPoints}>{details.points[0].value} pts</Text>
          </View>
          <View style={styles.viewProductPrice}>
            <Text style={styles.productPrice}>{preco}</Text>
          </View>
        </Col>
      </Row>
    )
}


 
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
  row: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginHorizontal: 0,
    marginBottom: 10,
    borderRadius: 4,
    padding: 5,
    backgroundColor: '#FFFFFF'
  },
  viewImage: {
    flex: 1,
    alignItems:'flex-start',

  },
  imageProduct: {
    width: 115,
    height: 130,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 4 
  },
  viewProductDetails: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  productTitle: {
    color: '#656D82',
    fontWeight: '400',
    fontSize: 17,
    textAlign: 'center',
  },
  viewProductTitle: {
    height: 40,
    justifyContent: 'center',
  },
  productPrice: {
    color: '#3F4453',
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center'
  },
  viewProductPrice: {
    height: 20,
    justifyContent: 'center'
  },
  productPoints: {
    color: '#656D82',
    fontWeight: '400',
    fontSize: 17,
    textAlign: 'center'
  },
  viewProductPoints: {
    height: 40,
    justifyContent: 'center'
  }
});
