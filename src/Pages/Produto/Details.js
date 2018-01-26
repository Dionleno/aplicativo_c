/**
 * Contem1g App
 * @Pagina ProdutoDetalhes
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initDetails, onchangeitem, incrementeQuantidade, decrementeQuantidade, addProduto } from './Actions';  
import { View, Image, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import { Container, Text, Grid, Row, Col, Button, Spinner } from 'native-base';
import stylesGlobal from '../../StyleSheet/Buttons';
import HeaderExterno from '../../Static/HeaderExterno'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MOEDAS } from '../../Helpers/Constants';
import { MaskService } from 'react-native-masked-text';

export class ProdutoDetalhes extends Component {

	constructor(props) {
		super(props);
	}
	
  componentDidMount = () =>{
    this.props.initDetails(this.props.navigation.state.params)
	}
	
	btnComprar(){
		if(this.props.add_produto_loading){
			return (
				<Spinner color='black' />
			);
		}

		return (
			<Button block style={stylesGlobal.btnPrimary} onPress={() => {this.props.addProduto()}}>
				<Text style={stylesGlobal.btnPrimaryText}>Comprar</Text>
			</Button>
		);
	}
  
	render({ produto } = this.props.navigation.state.params) {
		let produtoFirst = produto.product_details[0];
		let allproducts = produto.product_details;
     
		let preco = MaskService.toMask('money', produtoFirst.prices[0].value, MOEDAS.BLR);

    return (
			<Container padder style={{backgroundColor:'#FFFFFF'}}>
    		<HeaderExterno item={this.props} title={produto.name} />
				 
				<Grid style={{marginHorizontal:15}}>
					<Row style={{borderBottomWidth:1,borderColor:"#f1f1f1"}}>
						<Col style={{justifyContent: 'center',alignItems:"center"}}>
							<Text>{produto.name}</Text>
							<Text note>Cód. {this.props.details.code}</Text>
						</Col>
					</Row>
				
					<Row style={{alignItems:"center",height:190}}>
						<Col style={{alignItems:"center",height:180,flex:1,alignItems: 'stretch'}}>
							<ImageBackground style={{flex:1}} source={{ uri: this.props.details.imagemDestaque}} />
						</Col>
						
						<Col style={{alignItems:"center",flex:1}}>
							<Text style={{justifyContent: 'center',alignItems:"center",fontSize:22,margin:30,fontWeight:'bold'}}>{preco}</Text>
							
							<View style={{justifyContent: 'center',alignItems:"flex-end", flexDirection: 'row'}}>
								<Button  style={[stylesGlobal.btnPrimary,{justifyContent: 'center',alignItems:"center",flex:1,paddingHorizontal:8}]} onPress={this.props.decrementeQuantidade}>
									<Icon name="remove" style={{fontSize:18,color:"#FFFFFF"}}/>
								</Button>
								<View style={{justifyContent: 'center',alignItems:"center",flex:2,height:45,marginHorizontal:10, borderWidth:1,borderColor:"#f1f1f1"}}>
									<Text style={{justifyContent: 'center',alignItems:"center"}}>{this.props.details.quantidade}</Text>
								</View>
								<Button  style={[stylesGlobal.btnPrimary,{justifyContent: 'center',alignItems:"center",flex:1,paddingHorizontal:8}]} onPress={this.props.incrementeQuantidade}>
									<Icon name="add" style={{fontSize:18,color:"#FFFFFF"}}/>
								</Button>
							</View>
						</Col>
					</Row>

					<Row style={{borderBottomWidth:1,borderColor:"#f1f1f1",flex:1,marginBottom:15,alignItems: 'stretch'}}>
						<Col>
							<Text style={{fontSize:14,marginHorizontal:10}}>{produto.description}</Text>
						</Col>     
					</Row>

					<Row style={{flex:1,marginBottom:15}}>
						<ScrollView 
							directionalLockEnabled={false}
							horizontal={true} 
							style={{flex:1,height:180}}>
							{allproducts.map((item,key) => {
								return (
									<Button key={key} style={{width:80,height:80,marginHorizontal:10}}  onPress={() => this.props.onchangeitem(item)}>
										<Image source={{ uri: item.medias[0].url }} style={item.code === this.props.details.code ? styles.btnActive : styles.btnInative} />
									</Button>
								);
							})}
						</ScrollView>
					</Row>

					<Row>
						<View style={styles.viewBtnCarregarMaisProdutos}>
							{this.btnComprar()}
						</View>
					</Row>
				</Grid>

			</Container>
		)
	}
}

const mapStateToProps = state => (state.produto);
const mapDispatchToProps = dispatch => bindActionCreators({initDetails,onchangeitem,incrementeQuantidade,decrementeQuantidade,addProduto},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(ProdutoDetalhes);
 
const styles = StyleSheet.create({
  content: {
    marginVertical: 10
  },
  viewBtnCarregarMaisProdutos: {
    marginHorizontal: 10,
    flex:1,
    marginTop: 10
  },
  btnActive:{
		borderWidth:2.7,
		borderRadius:3,
		borderColor:'#20CDA6',
		width:80,
		height:80
  },
  btnInative:{
    borderWidth:1.5,borderRadius:3,borderColor:'#CCCCCC',width:80,height:80
  }
});