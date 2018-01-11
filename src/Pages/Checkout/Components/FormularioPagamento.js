import React, { Component } from 'react';
import { TextInput, View, Image, FlatList, Picker } from 'react-native';
import {
	Container,
	Text,
	Row,
	Col,
	Item,
	Content,
	Form,
	Button,
	Radio,
	Right,
	Left,
	List,
	ListItem,
	Spinner
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selecionarFrete, formaPagamento } from '../Actions';
import Ano from './Ano';
import Mes from './Mes';
import FormularioCartaoCredito from './FormularioCartaoCredito';

const CVV = require('../../../Images/cvv.png');

export class FormularioPagamento extends Component {

	constructor(props) {
		super(props);

		this.state = {
			checked: [],
			pagamento: {
				boleto: false,
				cartao: false
			}
		}
	}

	setPagamento(tipo) {
		// Boleto
		if(tipo === '1'){
			this.setState({pagamento: {cartao: false, boleto: true}});
		}

		// Cartão
		if(tipo === '2'){
			this.setState({pagamento: {cartao: true, boleto: false}});
		}

		this.props.formaPagamento(tipo);
	}

  formularioCartao() {
    const { form, setFormValor } = this.props;

    if(this.state.pagamento.cartao){
			return ( <FormularioCartaoCredito /> );
		}
  }

	loadingFormaEntrega(){
		if(this.props.loadingFormaEntrega){
			return (<Spinner color='black' />);
		}
	}

	infoFormaEntrega(){
		const { formasEntrega } = this.props;

		if(formasEntrega.length == 0){
			return (
				<Text style={[styles.radioText, {marginLeft: 15, marginRight: 15}]} >Selecione um endereço acima para listar as formas de entrega</Text>
			);
		}
	}

	render() {
		return (
			<View>
				<Row style={styles.title} >
					<Text style={styles.titleText}>Pagamento</Text>
					<Icon style={styles.titleIconArrowDown} name='keyboard-arrow-down' />
				</Row>

				<View style={styles.viewRadioBorder}>
					<View style={styles.viewRadio}>
						<Radio
							selected={this.state.pagamento.boleto}
							style={styles.radio}
							onPress={() => this.setPagamento('1')} />
						<Text style={styles.radioText}>Boleto</Text>
					</View>
					<View style={styles.viewRadioBorderIcon}>
						<Icon name='assignment' style={styles.titleOutlineIcon} />
					</View>
				</View>

				<View style={styles.viewRadioBorder}>
					<View style={styles.viewRadio}>
						<Radio
							selected={this.state.pagamento.cartao}
							style={styles.radio}
							onPress={() => this.setPagamento('2')} />
						<Text style={styles.radioText}>Cartão de Crédito</Text>
					</View>
					<View style={styles.viewRadioBorderIcon}>
						<Icon name='credit-card' style={styles.titleOutlineIcon} />
					</View>
				</View>
				
				{ this.formularioCartao() }
			</View>
		);
	}

}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ selecionarFrete, formaPagamento }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FormularioPagamento);