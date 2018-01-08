/**
 *  Pagina para selecionar o patrocinador
 */
 import React, { Component } from 'react';
 import { Platform ,Image, Alert ,ScrollView ,TextInput,FlatList,TouchableOpacity,Picker,StyleSheet } from 'react-native';
 import { View,Text ,Container,CheckBox,Content,Card,CardItem, Row,Form , Item,H3, Right,Radio,Input, Label,Button,Grid,Col ,Spinner,List,ListItem,Left,Thumbnail,Body} from 'native-base';
 /*REDUX*/
 import { connect } from 'react-redux'
 import { bindActionCreators } from 'redux'

 import Icon from 'react-native-vector-icons/MaterialIcons'
 import HeaderExterno from '../../Static/HeaderExterno'

 /*Componentes*/
 import ErrorForm from '../../Helpers/ErrorForm'
 import {handlerSubmit} from './Actions' 
 import {TextInputMask} from 'react-native-masked-text';
 import DadosPessoais from './Components/DadosPessoais'
 import DadosDeAcesso from './Components/DadosDeAcesso'
 import Endereco from './Components/Endereco'
 import OpcoesEntrega from './Components/OpcoesEntrega'
 import TermosDeUso from './Components/TermosDeUso'

 /*Helpers*/
import {RequestGet,RequestPost,RequestPOSTAuth} from '../../Helpers/Http'
   
 export class Cadastro extends Component{
   constructor(props) {
     super(props);
    } 

render() {
   
  return ( 
   <Container>
   <HeaderExterno item={this.props} title="Cadastro" />

   <Content >
     
      <DadosPessoais />
      <DadosDeAcesso />
      <Endereco />
      <OpcoesEntrega />
      <TermosDeUso />

        <View style={{paddingRight:15,paddingLeft:15}}>
             <Button block style={{backgroundColor: "#000000", marginTop:10, marginBottom:20}} onPress={() => this.props.handlerSubmit(this.props)}>
                <Text>Avançar</Text>
             </Button>
         </View>
 
   </Content>

   </Container>
   )
}
} 

const mapStateToProps = state => (state.cadastro)
 const mapDispatchToProps = dispatch => bindActionCreators({handlerSubmit},dispatch)
 export default connect(mapStateToProps,mapDispatchToProps)(Cadastro)