import React, { Component } from 'react';
import { Text, StatusBar, StyleSheet, View } from 'react-native';

import { Container, Header, Left, Button, Body, Title, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { excluir } from '../../Pages/Carrinho/Actions';

export class HeaderCarrinho extends Component {

	constructor (props) {
		super(props);
	}

	render() {
		return (
			<Header style={styles.container}>
				<StatusBar backgroundColor='#000000' />
				<Left>
					<Button transparent onPress={() => {this.props.navigation.goBack()}}>
						<Icon name='keyboard-arrow-left' style={{fontSize:22,color:'#FFFFFF'}}/>
					</Button>
				</Left>
			
				<Body>
					<Title>{ this.props.title }</Title>
				</Body>
				
				<Right>
					<Button transparent onPress={() => this.props.excluir()}>
						<Icon name="delete" style={{fontSize:22,color:'#FFFFFF'}} />
					</Button>
				</Right>
			</Header>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    	backgroundColor: '#000000',
  	},
});

const mapStateToProps = state => (state.carrinho);
export default connect(mapStateToProps, {excluir})(HeaderCarrinho);
