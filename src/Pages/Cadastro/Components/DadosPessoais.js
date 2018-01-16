/**
 *  Componente de cadastro
 */
import React, { Component } from 'react';
import { Platform ,TextInput} from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Row,Left, Thumbnail, Body} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {onChangeFieldUser} from '../Actions'  
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../Style'
import ErrorForm from '../../../Helpers/ErrorForm'
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
					<Icon style={styles.titleIconArrowDown} name='keyboard-arrow-down' />
				</Row>

				<View style={{paddingRight:15, paddingLeft:15, paddingVertical:20}}>        

				<Item regular style={{backgroundColor:'#FFFFFF',height:50}}>
					<TextInput style={styles.StyleInputText} 
						underlineColorAndroid='transparent' 
						placeholder="Nome Completo"
						returnKeyType={'next'}
						value={this.props.user.name} 
						onChangeText={(value) => this.props.onChangeFieldUser(value,'name')  }
					/>
				</Item>
				<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.name']}/>

				<Item regular style={{backgroundColor:'#FFFFFF',height:50}}>
					<TextInputMask style={styles.StyleInputText} 
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
				</Item>
				<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.document']}/>

				<Item regular style={{backgroundColor:'#FFFFFF',height:50}}>
					<TextInputMask underlineColorAndroid='transparent'
						type={'datetime'}
						placeholder="Data de Nascimento"
						style={styles.StyleInputText}
						onChangeText={(value) => this.props.onChangeFieldUser(value,'birth_date') }
						value={this.props.user.birth_date}
						options={{format: 'DD/MM/YYYY'}} 
						returnKeyType={'next'}
					/>
				</Item>
				<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.birth_date']}/>
				
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => (state.cadastro)
const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldUser},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(DadosPessoais)