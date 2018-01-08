/**
 *  Componente de cadastro
 */
 import React, { Component } from 'react';
 import { Platform ,TextInput} from 'react-native';
 import { View, Item, Input, Text, Button, Right, ListItem, Row,Left, Thumbnail, Body,Grid,Col,Picker} from 'native-base';
 /*REDUX*/
 import { connect } from 'react-redux'
 import { bindActionCreators } from 'redux'
 import {onChangeFieldUser,onChangeFieldPhone,onChangeField} from '../Actions'  
 import Icon from 'react-native-vector-icons/MaterialIcons'
 import styles from '../Style'
 import ErrorForm from '../../../Helpers/ErrorForm'
 import {TextInputMask} from 'react-native-masked-text';
 import {RequestGet} from '../../../Helpers/Http' 

 export class DadosDeAcesso extends Component {
 	constructor(props) {
 		super(props);
 	}

 	componentDidMount = async() =>{
 		await RequestGet('general/phone_companies')
 		.then(resp => resp.json())
 		.then(resp => this.props.onChangeField(resp.data,'listoperadora'));

 	}

 	render() {

 		let serviceItems =  this.props.listoperadora.map( (s, i) => {
 			return <Picker.Item key={i} value={s.id} label={s.name} />
 		});

 		return (
 			<View>
	 			<Row style={styles.title} >
		 			<Text style={styles.titleText}>Dados de acesso</Text>
		 			<Icon style={styles.titleIconArrowDown} name='keyboard-arrow-down' />
	 			</Row>

 			<View style={{paddingRight:15,paddingLeft:15,paddingVertical:20}}>
	 			<Grid>
	       	<Col style={{marginRight:3}}>
			 			<Item regular style={{backgroundColor:'#FFFFFF',height:60}}>
				 			<TextInput 
					 			style={styles.StyleInputText}
					 			underlineColorAndroid='transparent' 
					 			placeholder="Login" 
					 			onChangeText={(value) => this.props.onChangeFieldUser(value,'login')  }
				 			/>
			 			</Item>
		 				<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.login']}/>
		 			</Col>

		 			<Col style={{marginLeft:3}}>
			 			<Item regular style={{backgroundColor:'#FFFFFF',height:60}}> 
				 			<TextInput 
					 			style={styles.StyleInputText}
					 			underlineColorAndroid='transparent' 
					 			secureTextEntry={true} 
					 			placeholder="Senha" 
					 			onChangeText={(value) => this.props.onChangeFieldUser(value,'password')}
				 			/>
			 			</Item>
		 				<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.password']}/>
		 			</Col>

	 			</Grid>

	 			<Item regular style={{backgroundColor:'#FFFFFF',height:60}}>
		 			<TextInput 
			 			style={styles.StyleInputText}
			 			underlineColorAndroid='transparent' 
			 			placeholder="E-mail" 
			 			onChangeText={(value) => this.props.onChangeFieldUser(value,'email')}
		 			/>
	 			</Item>
 				<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.email']}/>

	 			<Item regular style={{backgroundColor:'#FFFFFF',marginBottom:8,height:60}}>
		 			<TextInput 
			 			style={styles.StyleInputText}
			 			underlineColorAndroid='transparent' 
			 			placeholder="Minisite" 
			 			onChangeText={(value) => this.props.onChangeFieldUser(value,'minisite')}
		 			/>
	 			</Item>    
	 			<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.minisite']}/>



	 			<Item regular style={{backgroundColor:'#FFFFFF',height:60}}>
		 			<TextInputMask 
			 			ref='myText'
			 			style={styles.StyleInputText}
			 			type={'cel-phone'}
			 			value={this.props.telephones[0].number}
			 			options={{ format: '(99) 99999-9999' }}
			 			underlineColorAndroid='transparent'  
			 			placeholder="Celular" 
			 			onChangeText={(value) => this.props.onChangeFieldPhone(value,'number')}
		 			/>
	 			</Item>
	 			<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.cellphone']}/>
        <View style={{backgroundColor: '#FFFFFF',height:50}}>
	 			<Picker
		 			selectedValue={this.props.telephones[0].phone_company_id}
		 			onValueChange={(itemValue, itemIndex) => this.props.onChangeFieldPhone(itemValue,'phone_company_id')}>
			 			<Picker.Item key="0" value="0" label="Operadora" />
			 			{serviceItems}
			 			</Picker>
			 	</View>		
	 			<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.phone_company_id']}/>

 			</View>
 	 </View>
 			)
 	}
 }

 const mapStateToProps = state => (state.cadastro)
 const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldUser,onChangeFieldPhone,onChangeField},dispatch)
 export default connect(mapStateToProps,mapDispatchToProps)(DadosDeAcesso)