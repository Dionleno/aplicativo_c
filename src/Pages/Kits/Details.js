/**
 * Contem1g App
 * @Pagina Kits
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  View,
  Image,
  Dimensions,StyleSheet,
  FlatList,ScrollView,Alert,StatusBar
} from 'react-native';
/*REDUX*/
 import { connect } from 'react-redux'
 import { bindActionCreators } from 'redux'
 import {fetchGetKit,onSetKit} from './Actions'  
 import Icon from 'react-native-vector-icons/MaterialIcons'
 import styles from './Style'
 import ErrorForm from '../../Helpers/ErrorForm'
 import {TextInputMask, MaskService} from 'react-native-masked-text';
 import {RequestGet} from '../../Helpers/Http' 
 import HeaderExterno from '../../Static/HeaderExterno'
 import SpinnerOverlay from 'react-native-loading-spinner-overlay';
 import { MOEDAS } from '../../Helpers/Constants';

import {Content, Text ,Container , Item,Input,Thumbnail, H3,Label,Separator,Row,Button,Col,Grid ,Left,Card , CheckBox,List, ListItem,Body ,CardItem} from 'native-base';
 
 
export class KitsDatails extends Component {
    constructor(props) {
      super(props);
    }
   
  renderItensKit = ({item, id, index}) => {
 
     return (
       <ListItem icon>
           <Left>
              <Icon name="done" style={{fontSize:15}}/>
            </Left>
            <Body>
              <Text style={{fontSize:12}}>{item}</Text>
            </Body>
       </ListItem>  
      )
  }

 render({ kits } = this.props.navigation.state.params) {
  const { name,id,detail,description } = kits
  const imgKit = detail.medias[0].url
  const itensKit = description.split(',')
  const dimensions = Dimensions.get('window');
  const preco = MaskService.toMask('money', kits.detail.prices[0].value, MOEDAS.BLR);
  const precoResale = MaskService.toMask('money', kits.detail.prices[0].resale_price, MOEDAS.BLR);

  return (
        <Container style={{backgroundColor:'#FFFFFF'}}>
           <HeaderExterno item={this.props} title={name}/>
           <SpinnerOverlay visible={this.props.overlay} textContent={"Aguarde..."} textStyle={{color: '#FFF'}} />
         <Content style={{paddingBottom:20}}>
               

              <View style={{padding:15,alignItems:'center',}}>
                 <Image style={{width:200, height: 200,alignSelf:'center',}} source={{uri: imgKit}} />
             </View>
              <View style={{height:1,backgroundColor:'#f0eced'}}/>
              <Text style={styles.TitleH1}>{name}</Text>
              <Text style={{padding:15,color:'#333333',fontSize:13}}>{description}</Text>

              
             <Content>
                    <ListItem itemDivider>
                      <Text>Itens do kit</Text>
                   </ListItem>
                     <FlatList
                        data={itensKit}
                        keyExtractor={(item , index) => index}
                        renderItem={this.renderItensKit}
                    />
              </Content>

            <Grid style={{backgroundColor:'#f1f1f1',margin:15,borderRadius:5}}>
               <Row>
                 <Col style={{padding:20,flex:1,alignItems:'center',justifyContent: 'center',}}>
                    <Text style={{fontSize:18,color:'#333333',fontWeight: 'bold',}}>{preco}</Text>
                </Col>
                 <Col style={{padding:20,flex:1,alignItems:'center',justifyContent: 'center',}}>    
                      <Text style={styles.TextSmall}>1x s/ juros</Text>
                      <Text style={styles.TextSmall}>Bônus de equipe: 23%</Text>
                 </Col>
               </Row>
               <Row>
               <Col >
                 <View style={{height:1,backgroundColor:'#eae4e6'}}/>
                  </Col>
               </Row>
               <Row>
                 <Col style={{padding:20,flex:1,alignItems:'center',justifyContent: 'center',}}>
                    <Text style={{fontSize:18,color:'#333333',fontWeight: 'bold',}}>{precoResale}</Text>
                  </Col>
                 <Col style={{padding:20,flex:1,alignItems:'center',justifyContent: 'center',}}>    
                     <Text style={styles.TextSmall}>Sugestão de revenda</Text>
                     <Text style={styles.TextSmall}>recupere até 23%</Text>
                     <Text style={styles.TextSmall}>do valor investido</Text>
                 </Col>
               </Row>
            </Grid>

            <View style={{padding:15}}>
                <Text note>As fragrâncias, produtos e cores podem sofrer alterações.</Text>
             </View>
              <View style={{padding:15}}>
                  <Button block style={styles.btnPrimary}  onPress={() => this.props.onSetKit(kits,this.props) }>    
                    <Text style={{color:'#FFFFFF'}}>Selecionar este kit</Text>
                  </Button>
              </View>
          </Content>
        </Container>
         
    )
  }
}  
   
const mapStateToProps = state => (state.kits)
 const mapDispatchToProps = dispatch => bindActionCreators({fetchGetKit,onSetKit},dispatch)
 export default connect(mapStateToProps,mapDispatchToProps)(KitsDatails)  