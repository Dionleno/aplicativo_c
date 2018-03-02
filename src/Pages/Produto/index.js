
/**
 * Contem1g App
 * @Pagina Produtos
 * @flow
 */

import React, { Component } from 'react';

/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { listarProdutos, changeItem, _onOpenInputSearch, _onClosedInputSearch, searchRequestItem, changeDisplayTemplateProduto } from './Actions'
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

export class Produtos extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps = (nextProps) => {
     
    if (this.props._slug !== nextProps._slug) {
      console.log('ok')
      this.props.changeItem('_slug', nextProps._slug)
      this.props.changeItem('actualPage', 1)
      this.props.changeItem('produtos', [])
      this.props.changeItem('lastPage', 0)
      this.refs.FilterDrawer.closeDrawer()
      this.props.listarProdutos()
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
const mapDispatchToProps = dispatch => bindActionCreators({ listarProdutos, changeItem, _onOpenInputSearch, _onClosedInputSearch, searchRequestItem, changeDisplayTemplateProduto }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Produtos)  