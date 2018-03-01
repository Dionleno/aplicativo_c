/**
 * Contem1g App
 * @Pagina Produtos
 * @flow
 */

import React, { Component } from 'react';

/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { listarProdutos, changeItem, _onOpenInputSearch, _onClosedInputSearch, searchRequestItem,changeDisplayTemplateProduto } from './Actions'
import { TouchableOpacity, AppRegistry, View, StyleSheet } from 'react-native';
import { Container, Button, Text, Header, Item, Content, Grid, Row, Col, Fab } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Style'
import HeaderProdutos from '../../Static/HeaderProdutos'
import IF from '../../Helpers/if'
import styleButton from '../../StyleSheet/Buttons';
// Paginas estaticas
import LsProdutos from '../../Components/Produtos'
import FilterProdutosDrawer from '../../Components/Drawers/FilterProdutosDrawer'
import ProdutosDrawer from '../../Components/Drawers/ProdutosDrawer'
import Filter from '../../Components/Produtos/filter'


 export class Categorias extends Component {

  constructor(props) {
    super(props); 
  } 
 
  componentWillReceiveProps = (nextProps) =>{
       const categoria = nextProps.navigation.state.params
                         ? nextProps.navigation.state.params.categoria
                         : false
                         console.log('slug');
                         console.log(this.props._slug);
       if(categoria){
        console.log('Will');
        console.log(categoria);
         if(this.props._slug !== categoria.slug){
               console.log('ok')
               this.props.changeItem('_slug', categoria.slug)
               this.props.changeItem('actualPage', 1)
               this.props.changeItem('produtos', [])
               this.props.changeItem('lastPage', 0)
               
               this.props.listarProdutos()
         }

       }
  }
 
  componentDidMount = async() => {
    
    
    if(this.getNavigationParams()){
     
      
      const categoria  = this.props.navigation.state.params.categoria
      console.log('did');
      console.log(categoria);
      this.props.changeItem('_slug', categoria.slug)
      await this.props.listarProdutos()
    } 
         
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
              <Filter FilterDrawer={() => this.refs.FilterDrawer.openDrawer()} />
              <IF visible={this.props.informacao}>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>{this.props.informacao}</Text>
              </IF>
              <Row style={{ padding: 5 }}>
                <Col>
                  <LsProdutos />
                </Col>
              </Row>
            </Grid>

            <Fab active={true}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: '#20CDA6' }}
              position="bottomRight"
              onPress={() => this.props.navigation.navigate('Carrinho')}>

              <Icon name='shopping-cart' style={{ fontSize: 22, color: '#FFFFFF' }} />

            </Fab>
          </FilterProdutosDrawer>

        </ProdutosDrawer>

      </Container>
    )
  }
}


const mapStateToProps = state => (state.produto)
const mapDispatchToProps = dispatch => bindActionCreators({ listarProdutos, changeItem, _onOpenInputSearch, _onClosedInputSearch, searchRequestItem,changeDisplayTemplateProduto }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Categorias)  