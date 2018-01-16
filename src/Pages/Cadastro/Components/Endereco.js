/**
 *  Componente de cadastro
 */
import React, { Component } from 'react';
import { Platform ,TextInput} from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Row,Left, Thumbnail, Body,Grid,Col,Picker} from 'native-base';

/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {onChangeFieldAddress,onChangeField,changeStateBindCity,onGetAddressByCep} from '../Actions'  
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../Style'
import ErrorForm from '../../../Helpers/ErrorForm'
import {TextInputMask} from 'react-native-masked-text';
import {RequestGet} from '../../../Helpers/Http';

export class Endereco extends Component {
 	constructor(props) {
 		super(props);
 	}

 	componentDidMount(){
 		RequestGet('general/states')
 		.then(resp => resp.json())
 		.then(resp => this.props.onChangeField(resp.data,'states'));
 	}
 
 	render() {

    let serviceStates =  this.props.states.map( (s, i) => {
	    return <Picker.Item key={i} value={s.id} label={s.uf} />
	  });

	  let citiesUpdate = this.props.cities.map((s, i) => {
	    return <Picker.Item key={i} value={s.id} label={s.name} />
	  });
 		 
 		return (
 	 		<View>
	   		<Row style={styles.title} >
		   		<Text style={styles.titleText}>Endereço</Text>
		   		<Icon style={styles.titleIconArrowDown} name='keyboard-arrow-down' />
	   		</Row>

	   		<View style={{paddingRight:15,paddingLeft:15,paddingVertical:20}}>
		   		<Item regular style={{backgroundColor:'#FFFFFF',height:50}}>
						<TextInputMask 
							style={styles.StyleInputText}
							options={{ format: '99999-999' }}
							type={'zip-code'}
							underlineColorAndroid='transparent' 
							placeholder="CEP" 
							onBlur={() => {this.props.onGetAddressByCep(this.props.address.zip)}}
							keyboardType='numeric' 
							onChangeText={(value) => this.props.onChangeFieldAddress(value,'zip')} 
							maxLength={9} value={this.props.address.zip}
						/>
		   		</Item>
		   
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['zip']} />

		   		<Item regular style={{backgroundColor:'#FFFFFF',height:50}}>
						<TextInput
							style={styles.StyleInputText}
							underlineColorAndroid='transparent' 
							placeholder="Rua" 
							onChangeText={(value) => this.props.onChangeFieldAddress(value,'street')} 
							value={this.props.address.street}
						/>
		   		</Item>
		   		
					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['street']}/>
					
					<Item regular style={{backgroundColor:'#FFFFFF',height:50}}>
						<TextInput
							style={styles.StyleInputText}
							underlineColorAndroid='transparent' 
							placeholder="Bairro" 
							onChangeText={(value) => this.props.onChangeFieldAddress(value, 'district')} 
							value={this.props.address.district}
						/>
		   		</Item>

					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['district']} />

					<View style={{flexDirection: 'row'}}>
						<View style={[styles.viewPicker, {marginLeft: 3, marginRight: 5}]}>
							<Picker
								selectedValue={this.props.address.state_id}
								onValueChange={(itemValue, itemIndex) => { itemValue != 0 ? this.props.changeStateBindCity(itemValue, itemIndex) : ''}}>
								<Picker.Item key={0}  value={0} label='UF' />
								{serviceStates}
							</Picker>
						</View>   
						<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['state_id']}/>
				
						<View style={[styles.viewPicker, {marginLeft: 5}]}>
							<Picker
								enabled={this.props.address.state_id != ''}
								selectedValue={this.props.address.city_id}
								onValueChange={(itemValue, itemIndex) => this.props.onChangeFieldAddress(itemValue,'city_id')}>
								<Picker.Item key={0}  value={0} label='Cidade' />
								{citiesUpdate}
							</Picker>
						</View> 
						<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['city_id']}/>
					</View>

					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1, marginRight: 4}}>
							<Item regular style={{backgroundColor:'#FFFFFF', height:50}}> 
								<TextInputMask 
									style={styles.StyleInputText}
									underlineColorAndroid='transparent' 
									placeholder="Número" 
									keyboardType='numeric'
									type='only-numbers'
									value={this.props.address.number}
									onChangeText={(value) => this.props.onChangeFieldAddress(value,'number')} 
								/>
							</Item>
							<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['number']}/>
						</View>

						<View style={{flex: 1, marginLeft: 5}}>
							<Item regular style={{backgroundColor:'#FFFFFF', height:50}}> 
								<TextInput 
									style={styles.StyleInputText}
									underlineColorAndroid='transparent' 
									placeholder="Complemento" 
									onChangeText={(value) =>  this.props.onChangeFieldAddress(value,'complement')}
								/>
							</Item>
							<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['complement']}/>
						</View>
					</View>
	   		</View>
			</View>
 		)
 	}
}

const mapStateToProps = state => (state.cadastro);
const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldAddress,onChangeField,changeStateBindCity,onGetAddressByCep},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Endereco);