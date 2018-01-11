/**
 * Contem1g App
 * @Pagina ProdutoDetalhes
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Platform, Dimensions,AsyncStorage} from 'react-native';
import { Container,Content, View,Thumbnail,Text,Button} from 'native-base';
 
import stylesButtons from '../../StyleSheet/Buttons';
import HeaderExterno from '../../Static/HeaderExterno'
import Icon from 'react-native-vector-icons/MaterialIcons'
 

export default class ProdutoDetalhes extends Component {

	constructor(props) {
		super(props);
  }
 
  setCupom = async(_response) =>{
        await AsyncStorage.setItem('@InfoCupom',  _response.coupon)
        await AsyncStorage.setItem('@UIPatrocinador',  JSON.stringify(_response.user))
        console.log(_response.coupon)
        this.props.navigation.navigate('Cadastro')
          
  }


  render({ cupominfo } = this.props.navigation.state.params) {  
	  
		let kit = cupominfo.product_detail.kits[0];
		let mediaUrl = cupominfo.product_detail.medias[0].url;
    let patrocinador = cupominfo.user;
    let avatar =  patrocinador.media[0].url; 	 
 
    return (
			  <Container>
         <HeaderExterno item={this.props} title="Ativação" />
        <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
          <View style={styles.drawerCover} >

            <View style={styles.boxitem}>
            <View style={[styles.avatarView,{width:100}]}>
              <Thumbnail source={{
                uri: avatar
              }} large />
            </View>
            <View style={{flex:1}}>
              <Text note style={[styles.avatarName,{fontSize:14,color:"#cccccc"}]}>Patrocinador</Text>
              <Text style={styles.avatarName}>{patrocinador.name}</Text>
              <Button block style={[stylesButtons.btnPrimary,{borderRadius: 0,paddingHorizontal: 0,marginVertical:10}]}
                      onPress={()=> this.setCupom(cupominfo)}>
                     <Text>Continuar</Text>
                    <Icon name='arrow-forward' style={{fontSize:25,color:'#FFFFFF', justifyContent: 'center'}} />
                </Button>
            </View>
            </View>
          </View>

          <View style={{margin:15,marginTop:0}}>
               <View style={{padding:15,alignItems:'center',}}>
                 <Thumbnail style={{width:200, height: 200,alignSelf:'center',}} source={{uri: mediaUrl}} />
             </View>
              <View style={{height:1,backgroundColor:'#f0eced'}}/>
              <Text style={styles.TitleH1}>{kit.name}</Text>
              <Text style={{padding:15,color:'#333333',fontSize:13}}>{kit.description}</Text>
           <Button block style={[stylesButtons.btnPrimary,{borderRadius: 0,paddingHorizontal: 0,marginVertical:10}]}
                   onPress={()=> this.setCupom(cupominfo)}>
                     <Text>Continuar</Text>
                    <Icon name='arrow-forward' style={{fontSize:25,color:'#FFFFFF', justifyContent: 'center'}} />
                </Button>
          </View>

          </Content>
      </Container>    
		)
	}
}
 
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
    flexDirection: 'row',
    flex: 1,
       margin: 15,
  },
  drawerCover: {
    alignSelf: "stretch",
    // resizeMode: 'cover',
    
    position: "relative",
    marginBottom: 20,
    backgroundColor: '#000000'
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
 
  },
  avatarName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold'
  },
  avatarAlfa: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});
