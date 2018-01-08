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
  Dimensions,StyleSheet,ImageBackground,
  FlatList,ScrollView,Alert,StatusBar
} from 'react-native';
 /*REDUX*/
 import { connect } from 'react-redux'
 import { bindActionCreators } from 'redux'
 import {fetchGetKit,onSetKit} from './Actions'  
 import Icon from 'react-native-vector-icons/MaterialIcons'
 import styles from './Style'
 import ErrorForm from '../../Helpers/ErrorForm'
 import {TextInputMask} from 'react-native-masked-text';
 import {RequestGet} from '../../Helpers/Http' 

import {Content, Text ,Container , Item,Input,Thumbnail, H3,Label,Row,Button,Col,Grid ,Left,Card , CheckBox,List, ListItem,Body ,CardItem} from 'native-base';
  
export class Kits extends Component {
     constructor(props) {
         super(props)
     } 

  componentDidMount = async() =>{
      await this.props.fetchGetKit();
  }
  render() {
    
    
    const { navigate } = this.props.navigation;

    return (
        <Container style={styles.ContainerMain} >
          <Content>
  
             <ImageBackground style={{backgroundColor:'#000000',height:100}}
                     source={require('../../Images/banner2.jpg')}>
               
                <View  style={styles.ContainerView} >  
                      <Text style={styles.TitleH1}>Escolha seu kit de adesão</Text> 
                 </View>
             
             </ImageBackground>
         
                  <FlatList 
                    data={this.props.kits}
                    extraData={this.props}
                    keyExtractor={(item, index) => item.id} 
                    numColumns={1}
                    renderItem={({item, id, index}) => {
                      return (
                      
                   <Content>
                     <Grid style={styles.GridBox}>
                         <Row style={{padding:0,paddingBottom:0}}>
                            <Col style={styles.TitleBox}>
                              <Text style={{fontSize:15,color:'#FFFFFF',fontWeight: 'bold',}}>{item.name}</Text>
                             </Col>
                         </Row>
                        <Row style={{paddingTop:15,}}>
                             <Col style={{flex:1,alignItems:'flex-start',justifyContent: 'center',}}>
                               <Text style={{fontSize:18,color:'#333333',fontWeight: 'bold',}}>R$ {item.detail.prices[0].value}</Text>
                               <Text style={styles.TextSmall}>1x s/ juros</Text>
                               <Text style={styles.TextSmall}>Bônus de equipe: 23%</Text>
                               <View style={{marginBottom:10,height:1,backgroundColor:'#ccd5dd'}}/> 
                               <Text style={styles.TextSmall}>Sugestão de revenda</Text>
                               <Text style={{fontSize:18,color:'#333333',fontWeight: 'bold',}}>R$ {item.detail.prices[0].resale_price}</Text>
                               <Text style={styles.TextSmall}>recupere até 23%</Text>
                               <Text style={styles.TextSmall}>do valor investido</Text>
                             </Col>

                             <Col style={{flex:1,alignItems:'flex-end',justifyContent: 'center',}}>
                               <Text style={{alignSelf:'flex-end',fontSize:12}}>Selecionar</Text>
                               <Text style={{alignSelf:'flex-end',marginBottom:10,fontSize:12}}>este kit</Text>
                              
                               <Button large style={this.props.kit.id == item.id ? [styles.btnPrimary,{alignSelf:'flex-end'}] : [styles.btnPrimaryOutline,{alignSelf:'flex-end'}]}
                                           onPress={() => this.props.onSetKit(item,this.props) }>
                                        <Icon name='done' style={{fontSize:25}} />
                                   </Button>
                                   
                              <Text style={{marginTop:10,fontSize:14,alignSelf:'flex-end',}}
                                onPress={()=>{
                                      navigate('KitDatails', { kits: item })
                                      }}>+Detalhes</Text>
                            </Col>
                        </Row>
  
                            
                     </Grid>

                   </Content>


                    
                      )
                    }} 
                  />

            <View style={{padding:15}}>
                  <Button block  style={styles.btnOutline}  onPress={() =>  this.props.navigation.navigate('ConfirmacaoCadastro')}>
                       <Icon name='clear' style={{fontSize:25}} />
                        <Text style={{color:'#333333'}}>Escolher o kit mais tarde</Text>
                  </Button>
              </View>
        </Content>
  
        </Container>
         
    )
  }
}  

 const mapStateToProps = state => (state.kits)
 const mapDispatchToProps = dispatch => bindActionCreators({fetchGetKit,onSetKit},dispatch)
 export default connect(mapStateToProps,mapDispatchToProps)(Kits)  