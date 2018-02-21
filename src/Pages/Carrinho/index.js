import React, {Component} from 'react';
import { View, FlatList } from 'react-native';
import { Container, Content, Button, Text, Spinner } from 'native-base';
import HeaderCarrinho from '../../Static/HeaderCarrinho';
import CarrinhoItem from './CarrinhoItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carregarCarrinho } from './Actions';
import styleButton from '../../StyleSheet/Buttons';
import ProdutosDrawer from '../../Components/Drawers/ProdutosDrawer'
export class Carrinho extends Component {

  constructor(props){
    super(props);

  }

  componentWillMount(){
    this.props.carregarCarrinho();
  }

  loading(){
    if(this.props.loading.carrinho){
      return (<Spinner color='black' />);
    }
  }

  informacao(){
    if(this.props.info != ''){
      return (<Text style={{backgroundColor: '#FFFFFF', textAlign: 'center', padding: 15}}>{this.props.info}</Text>);
    }
  }

  btnCheckout(){
    if(this.props.produtos.length > 0){
      return (
        <Button block onPress={() => this.props.navigation.navigate('Checkout')} style={[styleButton.btnPrimary, {marginRight: 5, marginLeft: 5, marginTop: 5, marginBottom: 5}]} >
          <Text style={styleButton.btnPrimaryText} >Checkout</Text>
        </Button>
      );
    }
  }

  renderCarrinhoItem = ({item, index}) => (
    <CarrinhoItem item={item} />
  );

  render(){
    return (
      <Container>
     
        <HeaderCarrinho
          title='Carrinho'
          navigation={this.props.navigation}
          excluir={this.excluir}
        />

        <Content>

          {this.loading()}

          {this.informacao()}

          <FlatList
            data={this.props.produtos}
            keyExtractor={(item, index) => item.id}
            renderItem={this.renderCarrinhoItem}
          />

          {this.btnCheckout()}
          
        </Content>
        
      </Container>
    )
  }

}

const mapStateToProps = state => (state.carrinho);
const mapDispatchToProps = dispatch => bindActionCreators({ carregarCarrinho }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Carrinho);