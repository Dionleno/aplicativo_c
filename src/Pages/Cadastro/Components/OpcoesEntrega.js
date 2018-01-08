/**
 *  Componente de cadastro
 */
 import React, { Component } from 'react';
 import { Platform ,TextInput} from 'react-native';
 import { View, Item, Input, Text, Button, Right,CheckBox, ListItem, Row,Left, Thumbnail, Body,Grid,Col,Picker} from 'native-base';
 /*REDUX*/
 import { connect } from 'react-redux'
 import { bindActionCreators } from 'redux'
 import {onChangeFieldUser,onChangeField,onselectStateDistribution} from '../Actions'  
 import Icon from 'react-native-vector-icons/MaterialIcons'
 import styles from '../Style'
 import ErrorForm from '../../../Helpers/ErrorForm'
 import {TextInputMask} from 'react-native-masked-text';
 import {RequestGet} from '../../../Helpers/Http' 
 import IF from '../../../Helpers/if'

 export class OpcoesEntrega extends Component {
 	constructor(props) {
 		super(props);
 	}
 
 	componentDidMount = async() =>{
 		await RequestGet('/general/cds_states')
 		.then(resp => resp.json())
 		.then(resp => this.props.onChangeField(resp.data,'centers_state'));
 	}

 	render() {
 		 let centersstate = this.props.centers_state.map((s, i) => {
		   return <Picker.Item key={i} value={s.id} label={s.name} />
		 })

		 let centers = this.props.centers.map((s, i) => {
		   return <Picker.Item key={i} value={s.id} label={s.name} />
		 });


 		return (
 			<View>
 			<Row style={styles.title} >
 			<Text style={styles.titleText}>Opções de entrega</Text>
 			<Icon style={styles.titleIconArrowDown} name='keyboard-arrow-down' />
 			</Row>

 			<ListItem style={{backgroundColor:'transparent',paddingLeft:0}}>
	 			<CheckBox checked={this.props.shipping_method} 
	 			          onPress={() => this.props.onChangeField(!this.props.shipping_method,'shipping_method') } />
 			<Body>
 			 		<Text style={{fontSize:12}}>Retirar no CD ?</Text>
 			</Body>
 			</ListItem>
 			<View style={{paddingRight:15,paddingLeft:15,paddingVertical:20}}>


 			<IF visible={this.props.shipping_method}>  
 					<Text style={{color:'#5c636a',margin:5}}>Centro de distribuição</Text>
		 			<Picker
				 			style={{backgroundColor:'#FFFFFF',marginBottom:8,height:40}}
				 			selectedValue={this.props.centers_state_id}
				 			onValueChange={(itemValue, itemIndex) => this.props.onselectStateDistribution(itemValue)}>
				 			<Picker.Item key={0}  value='' label='Selecione o estado' />
				 			{centersstate}
				 	</Picker>
 			    <ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.distribution_center_id']}/>
      
     			<Text style={{color:'#5c636a',margin:5}}>Centro de distribuição</Text>
		 			<Picker
				 			selectedValue={this.props.user.distribution_center_id}
				 			style={{backgroundColor:'#FFFFFF',marginBottom:8,height:40}}
				 			onValueChange={(itemValue, itemIndex) => this.props.onChangeFieldUser(itemValue,'distribution_center_id')}>
				 			<Picker.Item key={0}  value='' label='Selecione um CD' />
				 			{centers}
		 			</Picker>
 					<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.distribution_center_id']}/>
      </IF>



 			</View>
 			</View>
 			)
 	}
 }

 const mapStateToProps = state => (state.cadastro)
 const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldUser,onChangeField,onselectStateDistribution},dispatch)
 export default connect(mapStateToProps,mapDispatchToProps)(OpcoesEntrega)