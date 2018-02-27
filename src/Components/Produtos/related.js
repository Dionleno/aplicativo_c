import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listarProdutos } from '../../Pages/Produto/Actions';
import { TouchableOpacity,AppRegistry,FlatList} from 'react-native';
import { Row, Col ,Spinner,Button,Text,View } from 'native-base';
import ProdutoCard from '../../Pages/Produto/Components/ProdutoCard';
import VerticalCard from '../../Pages/Produto/Components/VerticalCard';
import IF from '../../Helpers/if';
import {RequestGetAuth} from '../../Helpers/Http'
import styleButton from '../../StyleSheet/Buttons';

class Related extends Component{

  constructor(props){
    super(props);
    this.state = {
        produtos: []
    }
  }

   

 listarProdutosCategoria = (slug) => {
 
		const URL = `/categories/${slug}/products?page=1`;

		/*
		* @Listar produtos
		*/       
		RequestGetAuth(URL)
			.then(resp => resp.json())
			.then(resp => {
                console.log(resp.data);
                this.setState({
                    produtos: resp.data
                })
            })
	

}

  componentDidMount = () =>{
    const { produto } = this.props.item.navigation.state.params
    const categoria = produto.category[0].slug
    this.listarProdutosCategoria(categoria)

  }
  
  _renderItem = ({item, id, index}) => (
    <View style={{flex:1}}>
      <VerticalCard item={item} propriedades={this.props}/>   
    </View>
  )
 
  render(){

    if(this.state.produtos.length == 0){
        return (
          <Spinner color='black' />
        );
      }


      return (

        <FlatList
        data={this.state.produtos}
        numColumns={2}
        extraData={this.state}
        keyExtractor={(item, index) => index}
        renderItem={this._renderItem}
      />

      )
  }
}  

export default Related