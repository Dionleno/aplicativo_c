/**
 * Contém1g App
 * @Pagina modelo Interna
 * @flow
 */

import React, { Component } from 'react';
import { Platform , Dimensions,StyleSheet, AsyncStorage} from 'react-native';
/*REDUX*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Content, Container, View, Thumbnail, Button, Text, Icon, Spinner } from 'native-base';
import { changeLoadingLogado } from './Actions'; 
import stylesButtons from '../../StyleSheet/Buttons';
import { USER_INFO} from '../../Helpers/Constants';
import { _navigateTo , LogOutSistem, AccessFast } from '../../Helpers/Http'

export class Logado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      buttonAccessFastLoading: false,
      buttonLogoutSistemLoading: false
    }
  }

  componentDidMount = async() => {

    const Userinfo = await AsyncStorage.getItem(USER_INFO);
 
    console.log(JSON.parse(Userinfo))
    this.setState({user: JSON.parse(Userinfo)})

    setTimeout(() => {
      this.props.changeLoadingLogado(false)
    }, 500)
  }

  buttonAccessFast = () => {
    if(this.state.buttonAccessFastLoading){
      return (<Spinner color='black' />);
    }

    return (
      <Button
        block 
        style={[stylesButtons.btnPrimary,{borderRadius: 0,paddingHorizontal: 0,marginTop:19}]}
        onPress={() => {
          this.setState({...this.state, buttonAccessFastLoading: true});
          
          AccessFast(
          (error) => {
            this.setState({...this.state, buttonAccessFastLoading: false});
            _navigateTo(this.props, 'Login');
          },
          (tela) => {
            this.setState({...this.state, buttonAccessFastLoading: false});
            _navigateTo(this.props, tela);
          });
        }}>
        <Text>Continuar</Text>
        <Icon name='arrow-forward' style={{fontSize:25,color:'#FFFFFF', justifyContent: 'center'}} />
      </Button>
    );
  }

  buttonLogoutSistem = () => {
    if(this.state.buttonLogoutSistemLoading){
      return (<Spinner color='black' />);
    }

    return (
      <Button
        block 
        style={[stylesButtons.btnPrimary,{borderRadius: 0,paddingHorizontal: 0,marginVertical:10}]}
        onPress={() => {
          this.setState({...this.state, buttonLogoutSistemLoading: true});
          LogOutSistem()
            .then(() => {
              this.setState({...this.state, buttonLogoutSistemLoading: false});
              _navigateTo(this.props, 'Home')
            });
        }}>
        <Text>Acessar outra conta</Text>
      </Button>
    );
  }

  render() {
    console.log(this.state.user)
    return (
      <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff",paddingVertical:20 }}>
          <View style={styles.drawerCover} >
            <View style={styles.boxitem}>
              <View style={[styles.avatarView,{width:80}]}>
                <Thumbnail source={{uri: 'https://guiadasempresas.com.br/wp-content/uploads/750x750_13f49be6-2cbf-4665-be16-14f91ee86b13.png'}} large />
              </View>
              <View style={{flex:1}}>
                <Text note style={[styles.avatarName,{fontSize:17,color:"#888888",marginTop:8}]}>Acessar com:</Text>
                <Text style={styles.avatarName}>{this.state.user.name}</Text>
                {this.buttonAccessFast()}
                {this.buttonLogoutSistem()}
              </View>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => (state.login)
const mapDispatchToProps = dispatch => bindActionCreators({changeLoadingLogado},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Logado)


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  content: {
    marginVertical: 10
  },
  viewBtnCarregarMaisProdutos: {
    marginHorizontal: 10,
    flex:1,
    marginTop: 10
  },
  btnActive:{
   borderWidth:2.7,borderRadius:3,borderColor:'#20CDA6',width:80,height:80
  },
  btnInative:{
    borderWidth:1.5,borderRadius:3,borderColor:'#CCCCCC',width:80,height:80
  },
  boxitem:{
     flex: 1,
       margin: 15,
  },
  drawerCover: {
    flex:1,
    alignSelf: "stretch",
    // resizeMode: 'cover',
    flexDirection: 'column',
    justifyContent: 'center',
    position: "relative",
    margin: 20,
   
  },
  drawerImage: {
    position: "absolute",
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  avatarView: {
     alignSelf:"center"
  },
  avatarName: {
    color: '#333333',
    fontSize: 25,
    alignSelf:"center",
    fontWeight: 'bold',
  },
  avatarAlfa: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});