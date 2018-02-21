import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listarProdutos } from '../Pages/Produto/Actions';
import { TouchableOpacity,AppRegistry,FlatList} from 'react-native';
import { Row, Col ,Spinner,Button,Text,View } from 'native-base';
import ProdutoCard from '../Pages/Produto/Components/ProdutoCard';
import VerticalCard from '../Pages/Produto/Components/VerticalCard';
import IF from '../Helpers/if';
import styleButton from '../StyleSheet/Buttons';

class LsProdutos extends Component{

  constructor(props){
    super(props);
  }

  loading = () => {
    if(this.props.loading){
      return (
        <Spinner color='black' />
      );
    }

    return (
      <Button full onPress={() => this.props.navigation.navigate('Carrinho')} style={[styleButton.btnPrimary, {marginRight: 5, marginLeft: 5, marginTop: 5, marginBottom: 5}]} >
        <Text style={styleButton.btnPrimaryText} >Avançar</Text>
      </Button>
    );
  }

  _renderItem = ({item, id, index}) => (
    <View style={{flex:1}}>
      <IF visible={this.props.visibleType === 1}>  
        <ProdutoCard item={item} propriedades={this.props}/>   
      </IF>
      <IF visible={this.props.visibleType === 2}>  
        <VerticalCard item={item} propriedades={this.props}/>   
      </IF>
    </View>
  )

  _keyExtractor = (item, index) => index;

  _onEndReached = ({distanceFromEnd}) => {
    if(!this.props.showButtonLoading) return;
    
    setTimeout(() => {
      this.props.listarProdutos()
    }, 1000);
  }

  render(){
    return(
      <FlatList
        data={this.props.produtos}
        extraData={this.props}
        ListFooterComponent={this.loading.bind(this)}
        numColumns={this.props.visibleType  == 1 ? 1 : 2}
        key = {(this.props.visibleType == 1 ) ? 'v' : 'h' }
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        onEndReachedThreshold={0.001}
        refreshing={true}
        onEndReached={this._onEndReached}s
      />
    )
  }
}  

const mapStateToProps = state => (state.produto);
const mapDispatchToProps = dispatch => bindActionCreators({ listarProdutos }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LsProdutos);