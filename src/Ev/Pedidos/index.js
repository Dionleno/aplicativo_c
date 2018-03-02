import React, { Component } from 'react';
import { Text, Container, Row, Col, Fab, Grid } from 'native-base';
import LsProdutos from '../../Components/Produtos';
import HeaderProdutos from '../../Static/HeaderProdutos';
import EvDrawer from '../../Components/Drawers/EvDrawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import FilterProdutosDrawer from '../../Components/Drawers/FilterProdutosDrawer';
import Filter from '../../Components/Produtos/filter';
import { verdeClaro } from '../../StyleSheet/Cores';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listarProdutos, changeItem, _onOpenInputSearch, _onClosedInputSearch, searchRequestItem, changeDisplayTemplateProduto } from '../../Pages/Produto/Actions';

class Pedidos extends Component{

  constructor(props) {
    super(props)
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
  
  render(){
    return(
      <Container>
        <EvDrawer ref="evDrawer">
          <HeaderProdutos
            item={this.props}
            opendrawer={() => this.refs.evDrawer.openDrawer()}
            title="Produtos" />

            <FilterProdutosDrawer ref="FilterDrawer">
              <Grid>
                <Filter FilterDrawer={() => this.refs.FilterDrawer.openDrawer()} />
                
                <Row style={{ padding: 5 }}>
                  <Col>
                    <LsProdutos />
                  </Col>
                </Row>
              </Grid>

              <Fab
                style={{ backgroundColor: verdeClaro }}
                position="bottomRight"
                onPress={() => this.props.navigation.navigate('Carrinho')}>
                <Icon name='shopping-cart' style={{ fontSize: 22, color: '#FFFFFF' }} />
              </Fab>
            </FilterProdutosDrawer>
        </EvDrawer>
      </Container>      
    )
  }
}

const mapStateToProps = state => (state.produto)
const mapDispatchToProps = dispatch => bindActionCreators({ listarProdutos, changeItem, _onOpenInputSearch, _onClosedInputSearch, searchRequestItem, changeDisplayTemplateProduto }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Pedidos) 