/**
 *  Pagina para selecionar o patrocinador
 */
import React, { Component } from 'react';
import { View, Animated, AsyncStorage } from 'react-native';
import { Text, Container, CheckBox, Content, Item, Button, Spinner } from 'native-base';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/MaterialIcons'
import HeaderExterno from '../../Static/HeaderExterno'
import PopupDialog, { DialogTitle, SlideAnimation, DialogButton } from 'react-native-popup-dialog';
import styleButtons from '../../StyleSheet/Buttons';
import styleInput from '../../StyleSheet/Input';

/*Componentes*/
import ErrorForm from '../../Helpers/ErrorForm'
import {handlerSubmit, SetFieldPhone, cadastrarContato, setPatrocinador} from './Actions' 
import DadosPessoais from './Components/DadosPessoais';
import DadosDeAcesso from './Components/DadosDeAcesso';
import DadosContato from './Components/DadosContato';
import Endereco from './Components/Endereco';
import OpcoesEntrega from './Components/OpcoesEntrega';
import TermosDeUso from './Components/TermosDeUso';
import FormularioContato from './Components/FormularioContato';
import PatrocionadorByCupom from './Components/FormCupom';

const AnimatedTI = Animated.createAnimatedComponent(Item);

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

 /*Helpers*/
import {RequestGet,RequestPost,RequestPOSTAuth} from '../../Helpers/Http'
   
export class Cadastro extends Component{
  
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.setPatrocinador();
  }

  botaoCadastrarContato(){
    if(this.props.contato_loading){
      return (<Spinner color='black' />);
    }

    return (
      <Button block style={styleButtons.btnPrimary} onPress={() => this.props.cadastrarContato(this.popupDialogContato)}>
        <Text>Cadastrar</Text>
      </Button>
    );
  }
 
  render() {
    return ( 
      <Container>
        <HeaderExterno item={this.props} title="Cadastro" />
        
        <PopupDialog
          dialogTitle={<DialogTitle title="Termos de uso" />}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          animationDuration={500}
          width={0.9}
          height={0.9}
          containerStyle={{ zIndex: 10, elevation: 10}}
          actions={[<DialogButton text="Fechar" key='xptop' align="center" onPress={() => this.popupDialog.dismiss()}/>]}>
          <Content>
            <Text>Texto de termos de uso</Text>
          </Content>
        </PopupDialog>

        <PopupDialog
          dialogTitle={<DialogTitle title="Cadastrar Contato" />}
          ref={(popupDialogContato) => { this.popupDialogContato = popupDialogContato }}
          animationDuration={500}
          width={0.9}
          height={0.70}
          containerStyle={{ zIndex: 10, elevation: 10}}
          actions={[
            <View key={0} style={{paddingVertical: 15, paddingHorizontal: 15}}>
              {this.botaoCadastrarContato()}
            </View>
          ]} >
          <FormularioContato />
        </PopupDialog>
        
        <Content style={{backgroundColor: '#FFFFFF'}}>
          <DadosPessoais />
          <DadosDeAcesso />
          <DadosContato popupDialogContato={this.popupDialogContato} />
          <Endereco />

          <PatrocionadorByCupom />
          
          <OpcoesEntrega />    
          <TermosDeUso _props={this}/>

          <View style={{paddingRight:15, paddingLeft:15, marginBottom: 15}}>
            <Button block style={styleButtons.btnPrimary} onPress={() => this.props.handlerSubmit(this.props)}>
              <Text>Avançar</Text>
            </Button>
          </View>
 
        </Content>

        <SpinnerOverlay visible={this.props.overlay} textContent={"Aguarde..."} textStyle={{color: '#FFF'}} />
        
      </Container>
    )
  } 
} 

const mapStateToProps = state => (state.cadastro)
const mapDispatchToProps = dispatch => bindActionCreators({handlerSubmit, SetFieldPhone, cadastrarContato, setPatrocinador},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Cadastro)