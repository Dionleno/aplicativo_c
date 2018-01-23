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
	Spinner,
	Body
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selecionarFrete, formaPagamento, removeCard } from '../Actions';
import Ano from './Ano';
import Mes from './Mes';
import styleButtons from '../../../StyleSheet/Buttons';
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

	renderItemCards = ({item, index}) => (
		<ListItem>
			<View style={styles.listCard}>
				<View style={styles.listCardLeft}>
					<Text style={styles.listCardText}>{item.numero}</Text>
					<Text style={styles.listCardText} note>{item.parcelas}</Text>
					<Text style={styles.listCardText} note>{item.valor}</Text>
				</View>
				<View style={styles.listCardRight}>
					<Button style={styles.listCardButtonExcluir} onPress={() => this.props.removeCard(index)}>
						<Icon name='close' style={{fontSize: 26, color: 'red'}}/>
					</Button>
				</View>
			</View>
		</ListItem>
	)

	btnCartao(){
		if(this.props.total_diff > 0){
			return (
				<View style={{marginHorizontal: 15, marginVertical: 15}}>
					<Button block style={styleButtons.btnPrimaryOutline} onPress={() => this.props.popupDialogCartao.dialog.show()} >
						<Text style={styleButtons.btnPrimaryOutlineText} >Informar Cartão de Crédito</Text>
					</Button>
				</View>
			);
		}
	}

  cartao() {
    const { form, setFormValor } = this.props;

    if(this.state.pagamento.cartao){
			return (
				<View>
					<View style={{ marginVertical: 10}}>
						<FlatList 
							data={this.props.cards_label}
							extraData={this.state}
							keyExtractor={(item, index) => index}
							renderItem={this.renderItemCards}
						/>
					</View>
					
					{this.btnCartao()}
				
				</View>
			);
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
				
				{ this.cartao() }
			</View>
		);
	}

}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ selecionarFrete, formaPagamento, removeCard }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FormularioPagamento);