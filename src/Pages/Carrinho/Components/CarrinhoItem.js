import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {
	Text,
	ListItem,
	Icon,
	CheckBox,
	Left,
	Body
} from 'native-base';
import { connect } from 'react-redux';
import { check, changeCarrinhoCheckout } from '../Actions';
import { MaskService } from 'react-native-masked-text';
import { MOEDAS } from '../../../Helpers/Constants';
import _ from 'lodash';
import styles from '../Style';

export class CarrinhoItem extends Component {

	constructor(props){
		super(props);

		this.state = {
			checked: false
		};
	}

	setCheckboxItem() {
		this.setState({ checked: !this.state.checked });
		this.props.check(this.props.item.id, this.props.checked);
	}

	showCheckbox = () => {
		if(this.props.item.detail.kits.length === 0){
			return (
				<CheckBox 
					checked={this.state.checked} 
					color={'black'} 
					onPress={() => this.setCheckboxItem()} 
				/>
			);
		}
	}

	opacity = stock => {
		if(stock <= 0){
			return (<View style={styles.produtoIndisponivel}></View>);
		}
	}

	esgotado = stock => {
		if(stock <= 0){
			return (
				<View style={styles.carrinhoItemInfo}>
					<Text>PRODUTO ESGOTADO!</Text>
				</View>
			);
		}
	}

	render () {
		const item = this.props.item;
		const { detail, price } = item;
		const media = _.first(detail.medias);
		const preco = MaskService.toMask('money', price.value, MOEDAS.BLR);
		const stock = _.first(detail.stocks).amount_virtual; 
		let nome = detail.product.name;
		
		if(detail.kits.length > 0){
			nome = detail.kits[0].name;
		}

		return (
				<ListItem style={styles.view}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						
						<View style={styles.viewCheckbox}>
							{this.showCheckbox()}
						</View>

						<View style={styles.viewImage}>
							{this.opacity(stock)}
							<Image
								defaultSource={require('../../../Images/icon.jpg')}
								source={{ uri: media.url }} 
								style={styles.imageStyle} />
						</View>

						<View style={styles.textStyle}>
							{this.opacity(stock)}
							<Text style={styles.textProductName}>{nome}</Text>
							<Text style={styles.textPrice}>{preco}</Text>
							<Text style={styles.textQuantidade}>Quantidade: {item.amount}</Text>
						</View>
					</View>

					{this.esgotado(stock)}
					
				</ListItem>
		);
  }
}

const mapStateToProps = state => (state.carrinho);
export default connect(mapStateToProps, { check, changeCarrinhoCheckout })(CarrinhoItem);