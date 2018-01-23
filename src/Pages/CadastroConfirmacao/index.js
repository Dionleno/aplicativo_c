/**
 *  Pagina para confirmar cadastro
 */
import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { View, Text, Container, Spinner, Content, Button, H3} from 'native-base';

/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeIsCart } from './Actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderExterno from '../../Static/HeaderExterno';

/*Componentes*/
import ErrorForm from '../../Helpers/ErrorForm';
import {TextInputMask} from 'react-native-masked-text';
import IF from '../../Helpers/if';
import styles from './Style';
import stylesButton from '../../StyleSheet/Buttons';

/*Helpers*/
import { RequestAuth, RequestGetAuth } from '../../Helpers/Http';

export class ConfirmacaoCadastro extends Component {
  
  constructor(props) {
    super(props);
  }
  

  componentDidMount(){
    RequestGetAuth('carts')
    .then(resp => resp.json())
    .then(resp => {
      if(resp.error) {
        this.props.changeIsCart(0);
      }else{
        this.props.changeIsCart(1);
      }
    });
  }

  botaoProximaPagina = () => {

    if(this.props.issetCart == 0){
      return (
        <View style={{ padding:15 }}>
          <Button block style={stylesButton.btnPrimary}  onPress={() => this.props.navigation.navigate('Login') }>
            <Text style={stylesButton.btnPrimaryText}>Login</Text>
          </Button>
        </View>
      );
    }

    if(this.props.issetCart == 1){
      return (
        <View style={{ padding:15 }}>
          <Button block style={stylesButton.btnPrimary} onPress={() => this.props.navigation.navigate('Drawer') }>
            <Text style={stylesButton.btnPrimaryText}>Acessar a loja</Text>
          </Button>
        </View>
      );
    }

    return (
      <Spinner color='black' />
    );
  }

  render() {
    console.log(this.props.issetCart)

    return (
      <Container style={{backgroundColor:'#FFFFFF'}}>
        
        <Content style={{paddingBottom:20}}> 
          <ImageBackground 
            style={{backgroundColor:'#000000',height:100}}
            source={require('../../Images/banner2.jpg')}>
              
              <View  style={styles.ContainerView} >  
                <Text style={styles.TitleH1}>Você fez a escolha certa,</Text> 
                <Text style={styles.TitleH1}>Seja bem vindo(a)!</Text> 
              </View>
            
          </ImageBackground>
            
          <View style={{padding:15,marginTop:25}}>
            <Button rounded  style={styles.btnOutline} >
              <Icon name='done' style={{fontSize:45,color:'#20CDA6'}} />
            </Button>
          </View>
          
          <View style={{alignItems: 'center',padding:15}}>
            <H3 style={styles.H3}>Seu cadastro foi realizado</H3>
            <H3 style={styles.H3}>com sucesso!</H3>
          </View>

          <View style={{alignItems: 'center',padding:15}}>
            <Text>Parabéns, você está próximo de </Text>
            <Text>se tornar um revendedor</Text>
            <Text>Contem 1g Magic.</Text>
            <Text  style={{paddingTop:15}}>Aguarde o email com mais informações.</Text>
          </View>

          {this.botaoProximaPagina()}

        </Content>
      </Container>
    )
  }
}  

const mapStateToProps = state => (state.confirmacao);
const mapDispatchToProps = dispatch => bindActionCreators({changeIsCart},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(ConfirmacaoCadastro);
