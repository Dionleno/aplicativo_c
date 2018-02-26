import React, {Component} from 'react';
import { View, FlatList } from 'react-native';
import { Container, Content, Button, Text, Spinner, Footer } from 'native-base';
import HeaderCarrinho from '../../Static/HeaderCarrinho';
import CarrinhoItem from './Components/CarrinhoItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carregarCarrinho } from './Actions';
import styleButton from '../../StyleSheet/Buttons';
import styles from './Style';

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

  checkout(){
    this.props.carregarCarrinho(() => {
      if(this.props.checkout){
        this.props.navigation.navigate('Checkout');
      }
    });
  }

  btnCheckout(){
    if(this.props.produtos.length > 0 && this.props.checkout){
      return (
        <Button 
          block 
          onPress={() => this.checkout()} 
          style={styleButton.btnPrimary} >
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
      
        <HeaderCarrinho title='Carrinho' navigation={this.props.navigation} />

        <Content>
          {this.loading()}
          
          {this.informacao()}

          <FlatList
            style={{backgroundColor: '#FFF'}}
            data={this.props.produtos}
            keyExtractor={(item, index) => item.id}
            renderItem={this.renderCarrinhoItem}
          />
        </Content>
        
        <View style={styles.footer}>
          {this.btnCheckout()}
        </View>

      </Container>
    )
  }

}

const mapStateToProps = state => (state.carrinho);
const mapDispatchToProps = dispatch => bindActionCreators({ carregarCarrinho }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Carrinho);