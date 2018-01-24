/**
 *  Componente de cadastro
 */
import React, { Component } from 'react';
import { Platform ,TextInput} from 'react-native';
import { View, Item, Input, Text, Button, Row} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {onChangeFieldUser,onChangeField} from '../Actions'  ;
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../Style';
import styleInput from '../../../StyleSheet/Input';
import ErrorForm from '../../../Helpers/ErrorForm';
import {TextInputMask} from 'react-native-masked-text';

export class DadosPessoais extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Row style={styles.title} >
					<Text style={styles.titleText}>Dados pessoais</Text>
				
				</Row>

				<View style={{paddingRight:15, paddingLeft:15, paddingVertical:10}}> 
				
					<TextInput  
						style={this.props.errors['user.name'] != undefined ? styleInput.inputTextError : styleInput.inputTextCadastro}
						underlineColorAndroid='transparent' 
						placeholder="Nome Completo"
						returnKeyType={'next'}
						value={this.props.user.name}
						autoCapitalize='words' 
						onChangeText={(value) => this.props.onChangeFieldUser(value,'name')  }
					/>
					 
					<TextInputMask 
						style={this.props.errors['user.document'] != undefined ? styleInput.inputTextError : styleInput.inputTextCadastro}
						underlineColorAndroid='transparent' 
						type={'cpf'} 
						options={{ format: '999.999.999-99' }} 
						keyboardType='numeric' 
						onChangeText={(value) => this.props.onChangeFieldUser(value,'document')  } 
						maxLength={14} 
						placeholder="CPF" 
						value={this.props.user.document}
						returnKeyType={'next'}
					/>

					<TextInputMask 
					  style={this.props.errors['user.birth_date'] != undefined ? styleInput.inputTextError : styleInput.inputTextCadastro}
						underlineColorAndroid='transparent'
						type={'datetime'}
						placeholder="Data de Nascimento"
				    onChangeText={(value) => this.props.onChangeFieldUser(value,'birth_date') }
						value={this.props.user.birth_date}
						options={{format: 'DD/MM/YYYY'}} 
						returnKeyType={'next'}
					/>
					 
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => (state.cadastro)
const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldUser,onChangeField},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(DadosPessoais)