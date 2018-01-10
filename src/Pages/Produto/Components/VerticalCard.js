import React, { Component } from 'react';
import { AppRegistry, View, Image, FlatList, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Button, Container, Text, Header, Spinner, Card, CardItem, Body, Left, Right, Row,Grid, Col } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
 

export const VerticalCard  = props => {
    let item = props.item;
    let details = props.item.product_details[0];
    let img = details.medias[0].url;

    return (

      <Grid style={styles.row} onPress={ () => {props.propriedades.navigation.navigate('ProdutoDetails', {produto:item}) }}>
         <Row >
           <Col style={styles.viewImage}>
             <Icon name="visibility" style={{alignSelf:'flex-end',fontSize:20, color: '#20CDA6',}}/>
             <Image source={{ uri: img }} style={styles.imageProduct} />
          </Col>
         </Row>
         <Row>
           <Col style={styles.viewProductDetails}>
          <View style={styles.viewProductTitle}>
            <Text style={styles.productTitle}>{item.name}</Text>
          </View>
           
           <View style={styles.viewProductPoints}>
            <Text style={styles.productPoints}>{details.points[0].value} pts</Text>
          </View>

          <View style={styles.viewProductPrice}>
            <Text style={styles.productPrice}>R$ {details.prices[0].value}</Text>
          </View>

         
 
        </Col>
         </Row>
      </Grid>  
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
    height: 145,
   
  },
  viewProductDetails: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  productTitle: {
    color: '#656D82',
    fontWeight: '400',
    fontSize: 14,
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
    fontSize: 12,
    textAlign: 'center'
  },
  viewProductPoints: {
    height: 20,
    justifyContent: 'flex-start'
  }
});
