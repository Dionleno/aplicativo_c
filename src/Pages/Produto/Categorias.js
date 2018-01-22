/**
 * Contem1g App
 * @Pagina Produtos
 * @flow
 */

import React, { Component } from 'react';
 /*REDUX*/
 import { connect } from 'react-redux'
 import { bindActionCreators } from 'redux'
 import {listarProdutos,changeItem,_onOpenInputSearch,_onClosedInputSearch,searchRequestItem,listarProdutosCategoria} from './Actions'  
 import { AppRegistry, View, Image, FlatList, StyleSheet, AsyncStorage, Alert,TextInput ,Dimensions,Animated,LayoutAnimation} from 'react-native';
 import { StyleProvider, Container, Button, Text, Header, Spinner, Card, CardItem, Item, Input,List,ListItem, Body, Left,
  Right, Content,Grid,Row,Col} from 'native-base';


 import Icon from 'react-native-vector-icons/MaterialIcons'
 import styles from './Style'
 import HeaderProdutos from '../../Static/HeaderProdutos'
 import IF from '../../Helpers/if'
 import {ProdutoCard} from './Components/ProdutoCard'
 import {VerticalCard} from './Components/VerticalCard'

const AnimatedTI = Animated.createAnimatedComponent(Item);
 

 export class Produtos extends Component {

  constructor(props) {
    super(props); 
  } 
  componentWillReceiveProps = (nextProps) =>{
       const categoria = nextProps.navigation.state.params
                         ? nextProps.navigation.state.params.categoria
                         : false
        
       if(categoria){

         if(this.props._slug !== categoria.slug){
               console.log('ok')
               this.props.changeItem('_slug', categoria.slug)
               this.props.changeItem('actualPage', 1)
               this.props.changeItem('produtos', [])
               this.props.changeItem('lastPage', 0)
               
               this.props.listarProdutosCategoria()
         }

       }
  }
 
  componentDidMount = async() => {
    
    
    if(this.getNavigationParams()){
      const categoria  = this.props.navigation.state.params.categoria
      this.props.changeItem('_slug', categoria.slug)
      await this.props.listarProdutosCategoria()
    } 
      
      const Userinfo = await AsyncStorage.getItem('@Userinfo');
      
  }


  loading = () => {
    if(this.props.loading){
      return (<Spinner color='black' />);
    }else{
      return null
    }
  }
getNavigationParams() {
    return this.props.navigation.state.params || false
  }
  renderProducts = ({item, id, index}) => {
    var productDetails = item.product_details[0];
    
    return ( 
      <View style={{flex:1}}>

          <IF visible={this.props.visibleType === 1}>  
               <ProdutoCard item={item} propriedades={this.props}/>   
          </IF> 

          <IF visible={this.props.visibleType === 2}>  
              <VerticalCard item={item} propriedades={this.props}/>   
          </IF>   

      </View>
    );
  } 
  render() { 
        const categoria = this.getNavigationParams()
                          ? this.props.navigation.state.params.categoria
                          : {name: 'Produtos'}
        console.log(categoria)

    return (
      <Container>
          <HeaderProdutos
          item={this.props}
          title={categoria.name} />

        <Grid>
            <IF visible={!this.props.opensearch}>
                <Row style={{paddingHorizontal:5,paddingVertical:5,backgroundColor:'#f1f1f1',height:50}}>
                    <Col>
                        <View style={{flexDirection: 'row',justifyContent: 'flex-start',}}>
                          <Button style={this.props.visibleType == 1 ? styles.btnActive : styles.btnInative} onPress={() => this.props.changeItem('visibleType', 1)}>
                             <Icon name='menu' style={{fontSize:24}} />
                          </Button>

                          <Button style={this.props.visibleType == 2 ? styles.btnActive : styles.btnInative} onPress={() => this.props.changeItem('visibleType', 2)}>
                             <Icon name='apps' style={{fontSize:24}} />
                          </Button>
                        </View>
                    </Col>
                    <Col>
                        <View style={{flexDirection: 'row',justifyContent: 'flex-end',}}>
                      
                          <Button  style={styles.btnInative} onPress={() => this.props._onOpenInputSearch(this.props)}>
                            <Icon name='search' style={{fontSize:24}} />
                          </Button>
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
     
   
         {/*Listar produtos */}
         <Row style={{padding:5}}>
              <Col>
                <FlatList
                    data={this.props.produtos}
                    extraData={this.props}
                    ListFooterComponent={this.loading.bind(this)}
                    numColumns={this.props.visibleType  == 1 ? 1 : 2}
                    key = {( this.props.visibleType == 1 ) ? 'v' : 'h' }
                    keyExtractor={(item,index) => index}
                    renderItem={this.renderProducts}
                    onEndReachedThreshold={0.001}
                    refreshing={true}
                    onEndReached={({ distanceFromEnd }) => {
                    
                       if(!this.props.showButtonLoading) return;
                            setTimeout(() => {
                               this.props.listarProdutosCategoria()
                            }, 1000)
                          
                      }}
                  />
              </Col>
            </Row>
      </Grid>

      </Container>
    )
  }
}


 const mapStateToProps = state => (state.produto)
 const mapDispatchToProps = dispatch => bindActionCreators({listarProdutos,changeItem,_onOpenInputSearch,_onClosedInputSearch,searchRequestItem,listarProdutosCategoria},dispatch)
 export default connect(mapStateToProps,mapDispatchToProps)(Produtos)  