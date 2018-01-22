/**
 *  Componente de cadastro
 */
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { View, Input, Text, Right, Body, Picker, Row, ListItem, CheckBox} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {onChangeFieldUser,onChangeField,onselectStateDistribution} from '../Actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../Style';
import ErrorForm from '../../../Helpers/ErrorForm';
import {TextInputMask} from 'react-native-masked-text';
import {RequestGet} from '../../../Helpers/Http';
import IF from '../../../Helpers/if';
import styleInput from '../../../StyleSheet/Input';

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

				<ListItem style={{backgroundColor:'transparent',paddingLeft:0}} onPress={() => this.props.onChangeField(!this.props.shipping_method,'shipping_method') }>
					<CheckBox 
						color='black' 
						checked={this.props.shipping_method} 
						onPress={() => this.props.onChangeField(!this.props.shipping_method,'shipping_method') } 
					/>
					<Body>
						<Text style={{fontSize:12}}>Retirar no CD ?</Text>
					</Body>
				</ListItem>

				<View style={{paddingRight:15,paddingLeft:15,paddingVertical:10}}>
					<IF visible={this.props.shipping_method}>  
						
						<View style={[styleInput.picker, {marginBottom: 15}]}>
							<Picker
								selectedValue={this.props.centers_state_id}
								onValueChange={(itemValue, itemIndex) => this.props.onselectStateDistribution(itemValue)}>
								<Picker.Item key={0}  value='' label='Estado' />
								{centersstate}
							</Picker>
							<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.distribution_center_id']}/>
						</View>

						<View style={styleInput.picker}>
							<Picker
								selectedValue={this.props.user.distribution_center_id}
								onValueChange={(itemValue, itemIndex) => this.props.onChangeFieldUser(itemValue,'distribution_center_id')}>
								<Picker.Item key={0}  value='' label='Escolha o CD' />
								{centers}
							</Picker>
							<ErrorForm arrayError={this.props.errors} filterValidate={this.props.errors['user.distribution_center_id']}/>
						</View>
					</IF>
				</View>
 			</View>
 		)
	}
}

const mapStateToProps = state => (state.cadastro);
const mapDispatchToProps = dispatch => bindActionCreators({onChangeFieldUser,onChangeField,onselectStateDistribution},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(OpcoesEntrega);