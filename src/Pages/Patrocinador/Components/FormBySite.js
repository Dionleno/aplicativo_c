
/**
 *  Componente para lista patrocinadores
 */
import React, { Component } from 'react';
import { Platform ,TextInput } from 'react-native';
import { View, Item, Input, Text, Button, Right, ListItem, Left, Thumbnail, Body} from 'native-base';
/*REDUX*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {BuscarPatrocinador,onSelectedTypeSearch,onChangeField} from '../Actions'  
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text';
import StyleInput from '../../../StyleSheet/Input';
import buttons from '../../../StyleSheet/Buttons';

class PatrocionadorBySite extends Component {

	constructor(props){
		super(props);
	}

	render(){
		return (
			<View> 
				<View style={{ flexDirection: 'row', marginBottom: 15, borderColor: '#d2d6e0', borderWidth: 1, borderRadius: 4 }}>
					<View style={{flex: 0.60, justifyContent: 'center', paddingLeft: 15}} > 
						<Text onPress={() => this.refs.inputPatrocinador.focus()} style={{fontSize: 14, color: '#888888'}}>www.contem1gmagic.com/</Text>
					</View>
	
					<View style={{flex: 0.40}}>
						<TextInput
							ref='inputPatrocinador'
							underlineColorAndroid='transparent' 
							style={{backgroundColor: '#ffffff', paddingRight: 15, color: '#888888'}}
							placeholder='link'
							autoCapitalize='none'
							value={this.props.findtext} 
							returnKeyType={'search'}
							onBlur={() => this.props.BuscarPatrocinador()}
							onChangeText={(value) => this.props.onChangeField(value,'findtext')}
						/>
					</View>
				</View>
	
				<Button 
					full 
					iconLeft
					style={buttons.btnPreto} 
					
					onPress={() => this.props.BuscarPatrocinador()}>
					<Icon name='search' style={{fontSize:25,color:'#FFFFFF'}} />
					<Text>Buscar Patrocionador</Text>
				</Button>
			</View>
		)
	}
}

const mapStateToProps = state => (state.patrocionador)
const mapDispatchToProps = dispatch => bindActionCreators({BuscarPatrocinador,onSelectedTypeSearch,onChangeField},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(PatrocionadorBySite)