import React, { Component } from 'react';
import { AppRegistry, View, Image, FlatList, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Button, Container, Text, Header, Spinner, Card, CardItem, Body, Left, Right, Row,Grid, Col } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MOEDAS } from '../../../Helpers/Constants';
import { MaskService } from 'react-native-masked-text';
import { SEM_FOTO } from '../../../Helpers/Constants';
import { withNavigation } from 'react-navigation';
import { verdeClaro } from '../../../StyleSheet/Cores';
import MultPlatform from '../../../MultPlatform'

const VerticalCard  = props => {
    let item = props.item;
    let details = props.item.product_details[0];
    let img = details.medias[0].url || SEM_FOTO;
    
    let price = 0;
    try {
      price = details.prices[0].value;
    } catch (e) {}
    
    let preco = MaskService.toMask('money', price, MOEDAS.BLR);

    return (
      <Grid style={styles.row} onPress={ () => {props.navigation.navigate('ProdutoDetails', {produto:item}) }}>
       <Row>
          <Col>
            <Text style={styles.productPoints}>{details.points[0].value} pts</Text>
          </Col>
          <Col >
             <Icon name="visibility" style={{alignSelf:'flex-end',fontSize:20, color: verdeClaro, flex:1,}}/>
          </Col>
        </Row>
        <Row>
          <Col style={styles.viewImage}>
             <Image source={{ uri:img }} style={styles.imageProduct} />
          </Col>
        </Row>
        <Row>
          <Col style={styles.viewProductDetails}>
            <View style={styles.viewProductTitle}>
              <Text style={styles.productTitle}>{item.name}</Text>
            </View>
 
            <View style={styles.viewProductPrice}>
              <Text style={styles.productPrice}>{preco}</Text>
            </View>
          </Col>
        </Row>
      </Grid>  
    )
}

  export default withNavigation(VerticalCard)

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
    marginHorizontal: 4,
    marginBottom: 10,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FFFFFF',
    flex:1,
    paddingBottom:10
  },
  viewImage: {
    flex: 1,
    alignItems:'center',
  },
  imageProduct: {
    width: 115,
    height: 135,
   
  },
  viewProductDetails: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  productTitle: {
    color: '#656D82',
    fontWeight: '400',
    fontSize: MultPlatform.FontSizeTextDefault,
    
  },
  viewProductTitle: {
    height: 50,
 
    marginTop:10,
    justifyContent: 'center',
  },
  productPrice: {
    color: '#3F4453',
    fontWeight: '500',
    fontSize: 14,
  },
  viewProductPrice: {
    height: 30,
    justifyContent:'flex-end',
    
    alignSelf:'flex-start',
  },
  productPoints: {
    color: '#656D82',
    fontWeight: '400',
    fontSize: 12,
    width:100,
    alignSelf:'flex-start',
  },
  viewProductPoints: {
    height: 20,
    justifyContent: 'flex-start'
  }
});
