import React, { Component } from 'react';
import { Alert, FlatList, View, Image, AsyncStorage, StyleSheet } from 'react-native';
import {
	Container,
	Content,
	Text,
	List,
	ListItem,
	Thumbnail,
	Body,
	Left,
	Right,
	Button,
	Icon,
	CheckBox,
	Card,
	CardItem
} from 'native-base';

import { connect } from 'react-redux';
import { check } from './Actions';

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

	render () {
		const item = this.props.item;
		let nome = item.detail.product.name;

		if(item.detail.kits.length > 0){
			nome = item.detail.kits[0].name;
		}
		
		return (
			<List style={styles.view}>
				<ListItem>
					<View style={styles.viewCheckbox}>
						{this.showCheckbox()}
					</View>

					<View style={styles.viewImage}>
						<Image source={{ uri: item.detail.medias[0].url }} style={styles.imageStyle} />
					</View>

					<View style={styles.textStyle}>
						<Text style={styles.textProductName}>{nome}</Text>
						<Text style={styles.textPrice}>R$ {item.price.value}</Text>
						<Text style={styles.textQuantidade}>Quant.: {item.amount}</Text>
					</View>
				</ListItem>
			</List>
		);
  }
}

const styles = StyleSheet.create({
	view:{
		backgroundColor: 'rgba(255,255,255,1)'
	},
	viewCheckbox: {
		width: 50,
		alignItems: 'center'
	},
	viewImage: {
		flex: 1
	},
  	imageStyle: {
    	width: 80,
    	height: 80
  	},
  	textStyle: {
    	flex: 2
  	},
	textProductName: {
		textAlign: 'left',
		alignSelf: 'stretch',
		fontSize: 16
	},
	textPrice: {
		color: '#2e2f30',
		fontSize: 14,
		textAlign: 'left',
		alignSelf: 'stretch',
		marginTop: 3,
		paddingTop: 3,
		borderTopColor: '#7f7f7f',
		borderTopWidth: 0.5
	},
	textQuantidade: {
		color: '#2e2f30',
		fontSize: 14,
		textAlign: 'left',
		alignSelf: 'stretch',
		marginTop: 3
	}
});

const mapStateToProps = state => (state.carrinho);
export default connect(mapStateToProps, {check})(CarrinhoItem);