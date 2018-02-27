/**
 * Contem1g App
 * @Pagina Produtos
 * @flow
 */

import React, { Component } from 'react';

/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {listarProdutos,changeItem,_onOpenInputSearch,_onClosedInputSearch,searchRequestItem} from './Actions'  
import { TouchableOpacity,AppRegistry, View, Image, FlatList, StyleSheet, AsyncStorage, Alert,TextInput ,Dimensions,Animated,LayoutAnimation} from 'react-native';
import { StyleProvider, Container, Button, Text, Header, Spinner, Card, CardItem, Item, Input,List,ListItem, Body, Left,
Right, Content,Grid,Row,Col,Drawer } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Style'
import HeaderProdutos from '../../Static/HeaderProdutos'
import IF from '../../Helpers/if'
import styleButton from '../../StyleSheet/Buttons';
// Paginas estaticas
import LsProdutos from '../../Components/Produtos'
import FilterProdutosDrawer from '../../Components/Drawers/FilterProdutosDrawer'
import ProdutosDrawer from '../../Components/Drawers/ProdutosDrawer'

const AnimatedTI = Animated.createAnimatedComponent(Item);

export class Produtos extends Component {
  constructor(props) {
    super(props); 
  }

  componentWillMount = () =>{
    this.props.listarProdutos();
  } 


  informacao(){
    if(this.props.informacao){
      return (<Text style={{textAlign: 'center', marginTop: 10}}>{this.props.informacao}</Text>);
    }
  }

  render() {
      return (
        <Container>
          <ProdutosDrawer ref="menuDrawer">
            
            <HeaderProdutos
            item={this.props}
            opendrawer={() => this.refs.menuDrawer.openDrawer()}
            title="Produtos" />
            

              <FilterProdutosDrawer ref="FilterDrawer">
                  <Grid>
                    <IF visible={!this.props.opensearch}>
                      <Row style={{paddingHorizontal:5,paddingVertical:5, backgroundColor:'#F2f2f2',height:50}}>
                        <Col>
                          <View style={{flexDirection: 'row',justifyContent: 'flex-start',}}>

                            <TouchableOpacity style={this.props.visibleType == 1 ? styles.btnActive : styles.btnInative} onPress={()=> this.props.changeItem('visibleType', 1)}>
                              <Icon name='format-line-spacing' style={{fontSize:24}} />
                            </TouchableOpacity>

                            <TouchableOpacity style={this.props.visibleType == 2 ? styles.btnActive : styles.btnInative} onPress={() => this.props.changeItem('visibleType', 2)}>
                              <Icon name='widgets' style={{fontSize:22}} />
                            </TouchableOpacity>

                          </View>
                        </Col>
                        <Col>
                          <View style={{flexDirection: 'row',justifyContent: 'flex-end',}}>
                          
                            <TouchableOpacity style={styles.btnInative} onPress={() => this.props._onOpenInputSearch(this.props)}>
                              <Icon name='search' style={{fontSize:24}} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnInative} onPress={() => this.refs.FilterDrawer.openDrawer()}>
                              <Icon name='tune' style={{fontSize:24}} />
                            </TouchableOpacity>
                            
                          </View>
                        </Col>
                      </Row>
                    </IF>

                    <IF visible={this.props.opensearch}>
                      <Row style={{backgroundColor:'#000000',height:50}}>
                        <Col>
                          <AnimatedTI style={{height:47,width: this.props.slideAnim,backgroundColor:'#FFFFFF',paddingHorizontal:5,flexDirection: 'row',justifyContent: 'flex-end',alignSelf:'flex-end'}}>
                            <Icon active name='arrow-back' onPress={() => this.props._onClosedInputSearch(this.props)} style={{fontSize:24,color:'#888888'}}/>        
                            <Input
                              style={styles.StyleInputText}
                              autoFocus={true}
                              keyboardType='web-search'
                              returnKeyType="search"
                              underlineColorAndroid='transparent' 
                              onSubmitEditing={() =>this.props.searchRequestItem(this.props) }
                              placeholder="Buscar..." 
                              onChangeText={(value) => this.props.changeItem('search', value) }
                            />
                            <Icon active name='search' style={{fontSize:24,color:'#888888'}} onPress={() => this.props.searchRequestItem(this.props)} />         
                          </AnimatedTI>

                        </Col>
                      </Row>
                    </IF>

                    {this.informacao()}

                    {/*Listar produtos */}
                    <Row style={{padding:5}}>
                      <Col>
                        <LsProdutos />
                      </Col>
                    </Row>
                  </Grid>

              </FilterProdutosDrawer>
          </ProdutosDrawer>
        </Container>
      )
  }
}


const mapStateToProps = state => (state.produto)
const mapDispatchToProps = dispatch => bindActionCreators({listarProdutos,changeItem,_onOpenInputSearch,_onClosedInputSearch,searchRequestItem},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Produtos)  