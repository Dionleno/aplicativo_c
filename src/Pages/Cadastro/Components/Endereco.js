/**
 *  Componente de cadastro
 */
import React, { Component } from 'react';
import { TextInput} from 'react-native';
import { View, Item, Text, Row, Picker} from 'native-base';

/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {onChangeFieldAddress,onChangeField, changeStateBindCity, onGetAddressByCep} from '../Actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../Style';
import ErrorForm from '../../../Helpers/ErrorForm';
import {TextInputMask} from 'react-native-masked-text';
import {RequestGet} from '../../../Helpers/Http';
import styleInput from '../../../StyleSheet/Input';

export class Endereco extends Component {
 	constructor(props) {
 		super(props);
 	}

 	componentDidMount(){
 		RequestGet('general/states')
 		.then(resp => resp.json())
 		.then(resp => {this.props.onChangeField(resp.data, 'states')});
 	}
 
 	render() {
    let serviceStates = this.props.states.map( (s, i) => {
	    return <Picker.Item key={i} value={s.id} label={s.uf} />
	  });

	  let citiesUpdate = this.props.cities.map((s, i) => {
	    return <Picker.Item key={i} value={s.id} label={s.name} />
	  });
 		 
 		return (
 	 		<View>
	   		<Row style={styles.title} >
		   		<Text style={styles.titleText}>Endereço</Text>
		   
	   		</Row>

	   		<View style={{paddingRight:15,paddingLeft:15,paddingVertical:10}}>
		   	
					<TextInputMask 
						style={this.props.errors['user.address.zip'] != undefined ? styleInput.inputTextError : styleInput.inputTextCadastro}
						options={{ format: '99999-999' }}
						type={'zip-code'}
						underlineColorAndroid='transparent' 
						placeholder="CEP"
						onBlur={() => {this.props.onGetAddressByCep(this.props.address.zip)}}
						keyboardType='numeric' 
						returnKeyType={'next'}
						onChangeText={(value) => {this.props.onChangeFieldAddress(value,'zip')}} 
						maxLength={9} value={this.props.address.zip}
					/>
		   		
					<TextInput
						style={this.props.errors['user.address.street'] != undefined ? styleInput.inputTextError : styleInput.inputTextCadastro}
						underlineColorAndroid='transparent' 
						placeholder="Rua" 
						returnKeyType={'next'}
						onChangeText={(value) => this.props.onChangeFieldAddress(value,'street')} 
						value={this.props.address.street}
					/>

					<TextInput
						style={this.props.errors['user.address.district'] != undefined ? styleInput.inputTextError : styleInput.inputTextCadastro}
						underlineColorAndroid='transparent' 
						placeholder="Bairro" 
						returnKeyType={'next'}
						onChangeText={(value) => this.props.onChangeFieldAddress(value, 'district')} 
						value={this.props.address.district}
					/>
					
					<View style={{flexDirection: 'row'}}>
						
 
						<View style={{flex: 1, marginRight:5,paddingVertical: 10}}>
 
							<View style={styleInput.picker}>
							    <Picker
									iosHeader="Cidade"
									headerBackButtonText="Voltar"
									mode="dialog"
									{ ...this.props }
								    placeholder="Cidade"
									enabled={this.props.address.state_id != ''}
									selectedValue={this.props.address.state_id}
									onValueChange={(itemValue, itemIndex) => { itemValue != 0 ? this.props.changeStateBindCity(itemValue, itemIndex) : ''}}>
									{serviceStates}
								</Picker>
								 
							</View>
							 
						</View>

 
						<View style={{flex: 1, marginLeft: 5,paddingVertical: 10}}>
 
							<View style={styleInput.picker}>
								<Picker
									iosHeader="Cidade"
									headerBackButtonText="Voltar"
									mode="dialog"
									{ ...this.props }
								    placeholder="Cidade"
									enabled={this.props.address.state_id != ''}
									selectedValue={this.props.address.city_id}
									onValueChange={(itemValue, itemIndex) => this.props.onChangeFieldAddress(itemValue,'city_id')}>
									{citiesUpdate}
								</Picker>
							</View> 
							 
						</View>

					</View>

					<View style={{flexDirection: 'row'}}>
						
						<View	style={{flex:1, marginRight: 5}}>
							<TextInputMask 
								style={this.props.errors['user.address.number'] != undefined ? styleInput.inputTextError : styleInput.inputTextCadastro}
								underlineColorAndroid='transparent' 
								placeholder="Número" 
								returnKeyType={'next'}
								keyboardType='numeric'
								type='only-numbers'
								value={this.props.address.number}
								onChangeText={(value) => this.props.onChangeFieldAddress(value,'number')} 
							/>
						 
						</View>

						<View style={{flex:1, marginLeft: 5}}>
							<TextInput 
								style={this.props.errors['user.address.complement'] != undefined ? styleInput.inputTextError : styleInput.inputTextCadastro}
								underlineColorAndroid='transparent' 
								placeholder="Complemento" 
								value={this.props.address.complement}
								onChangeText={(value) =>  this.props.onChangeFieldAddress(value, 'complement')}
							/>
						</View>
					</View>

					<TextInput
						style={styleInput.inputTextCadastro}
						underlineColorAndroid='transparent' 
						placeholder="Ponto de Referência"
						onChangeText={(value) => this.props.onChangeFieldAddress(value, 'reference')} 
						value={this.props.address.reference}
					/>

	   		</View>
			</View>
 		)
 	}
}

const mapStateToProps = state => (state.cadastro);
const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldAddress,onChangeField,changeStateBindCity,onGetAddressByCep},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Endereco);