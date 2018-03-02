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
import Related from '../../Components/Produtos/related';
import { verdeClaro } from '../../StyleSheet/Cores';

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
			<Button style={stylesGlobal.btnPrimary} onPress={() => {this.props.addProduto()}}>
				<Text style={stylesGlobal.btnPrimaryText}>Comprar</Text>
			</Button>
		);
	}
  
	render({ produto } = this.props.navigation.state.params) {
		let produtoFirst = produto.product_details[0];
		let allproducts = produto.product_details;
		let price = '';
		let image = 'http://www.steps.com.br/arquivos/produto_sem_foto.gif';

		try {
			price = produtoFirst.prices[0].value;
		}catch(e){}

		try{
			image = this.props.details.imagemDestaque; 
		}catch(e){}

		let preco = MaskService.toMask('money', price, MOEDAS.BLR);

    return (
			<Container padder style={{backgroundColor:'#FFFFFF'}}>
    		<HeaderExterno item={this.props} title={produto.name} />

                <ScrollView style={{marginVertical:10}}> 
				<Grid style={{marginHorizontal:15}}>
					<Row style={{justifyContent: 'center',borderBottomWidth:1,borderColor:"#f1f1f1",height:50}}>
						<Col>
                            <Text style={{fontSize:14,fontWeight:'bold'}}>{produto.name}</Text>
                            <Text note>Cód. {this.props.details.code}</Text>
						</Col>
					</Row>
				
					<Row style={{alignItems:"center",height:200,marginBottom:10}}>
						<Col style={{alignItems:"center",height:200,flex:1}}>
							<ImageBackground style={{width:200,height:200}} source={{ uri: image }} />
						</Col>
					</Row>
                    <Row style={{borderTopWidth:1,borderBottomWidth:1,borderColor:"#f1f1f1",height:40,marginBottom:10}}>
                        <Col style={{justifyContent: 'center'}}>
                            <Text note>Selecione uma opção:</Text>
                        </Col>
                    </Row>
					<Row style={{flex:1,marginBottom:5}}>
						<ScrollView 
							directionalLockEnabled={false}
							horizontal={true} 
							style={{flex:1,height:50}}>
							{allproducts.map((item,key) => {
								let image = 'http://www.steps.com.br/arquivos/produto_sem_foto.gif';
								try{
									image = item.medias[0].url;
								}catch(e){}
								return (
									<Button key={key} style={{width:50,height:50,marginHorizontal:7}}  onPress={() => this.props.onchangeitem(item)}>
										<Image source={{ uri: image }} style={item.code === this.props.details.code ? styles.btnActive : styles.btnInative} />
									</Button>
								);
							})}
						</ScrollView>
					</Row>

                    <Row style={{marginVertical:20}}>
                        <Col style={{flex:1}}>
                            <Text note>Preço:</Text>
							<Text style={{justifyContent: 'center',fontSize:16,fontWeight:'bold'}}>{preco}</Text>
                        </Col>
                        <Col style={{flex:1}}>
                            <Text note>Pontos:</Text>
							<Text style={{justifyContent: 'center',fontSize:16,fontWeight:'bold'}}>{preco}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                              <View style={{justifyContent: 'center',alignItems:"flex-end", flexDirection: 'row'}}>
								<Button   style={[stylesGlobal.btnPrimary,{justifyContent: 'center',alignItems:"center",flex:1,paddingHorizontal:5}]} onPress={this.props.decrementeQuantidade}>
									<Icon name="remove" style={{fontSize:13,color:"#FFFFFF"}}/>
								</Button>
								<View style={{justifyContent: 'center',alignItems:"center",flex:2,height:45,marginHorizontal:10, borderWidth:1,borderColor:"#f1f1f1"}}>
									<Text style={{justifyContent: 'center',alignItems:"center"}}>{this.props.details.quantidade}</Text>
								</View>
								<Button   style={[stylesGlobal.btnPrimary,{justifyContent: 'center',alignItems:"center",flex:1,paddingHorizontal:5}]} onPress={this.props.incrementeQuantidade}>
									<Icon name="add" style={{fontSize:13,color:"#FFFFFF"}}/>
								</Button>
							</View>
                        </Col>
                        <Col>
                            <View style={styles.viewBtnCarregarMaisProdutos}>
                                {this.btnComprar()}
                            </View>
                        </Col>
                    </Row>
                    </Grid>

                   <Grid>  

                   <Row style={[styles.title,{marginTop:15}]} >
                            <Text style={styles.titleText}>Descrição:</Text>
                    </Row>
                    <Row style={{margin:20}}>
                        <Col>
                            <Text style={{fontSize:14}}>{produto.description}</Text>
                        </Col>
                    </Row>

                    <Row style={styles.title} >
                            <Text style={styles.titleText}>Produtos relacionados:</Text>
                    </Row>
                   

                    <Row>
                        <Col>
                             <Related item={this.props}/>
                        </Col>
                    </Row>
                    </Grid>
			
                </ScrollView>
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
    
  },
  btnActive:{
		borderWidth:2.7,
		borderRadius:3,
		borderColor:verdeClaro,
		width:50,
		height:50
  },
  btnInative:{
    borderWidth:1.5,borderRadius:3,borderColor:'#CCCCCC',width:50,height:50
  },
  title: {
    backgroundColor: '#F7F7F8',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 12,
    justifyContent: 'space-between',
    marginBottom: 7.5
 },
  titleText: {
    fontSize: 17,
    color: '#656D82',
    fontWeight: '500'
  },
});