
import React, { Component } from 'react';
import {
  Platform,
   AppRegistry, Image, ImageBackground ,ScrollView,StyleSheet,AsyncStorage
} from 'react-native';

import styles from "./Style";

import {Content,Text,List,ListItem,Icon,Container,Left,Right,Button,View,Thumbnail, Body} from 'native-base';
import {SafeAreaView, DrawerItems} from 'react-navigation';
import { USER_INFO } from '../../Helpers/Constants';
 


class SideBar extends Component {
    constructor(props) {
    super(props);
    this.state = {
      Userinfo: { }
    }
  }

  componentDidMount = async() => {
    const Userinfo = await AsyncStorage.getItem(USER_INFO);
     console.log(Userinfo)
    this.setState({
      Userinfo: JSON.parse(Userinfo)
    })
  }
     

  render() { 
    return (


  <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
          <ImageBackground source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwI1ke65_qgz9cmETDjXrfteGdhH5GOOwCrHU_-cZ5mrXJz7RZ"
            }} style={styles.drawerCover} >

            <View style={styles.avatarAlfa}></View>
            <View style={styles.avatarView}>
              <Thumbnail source={{
                uri: "https://guiadasempresas.com.br/wp-content/uploads/750x750_13f49be6-2cbf-4665-be16-14f91ee86b13.png"
              }} large />
            </View>
            <View>
              <Text style={styles.avatarName}>{this.state.Userinfo.name}</Text>
            </View>
          </ImageBackground>

          <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...this.props} />
            </SafeAreaView>
            
          </ScrollView>

        </Content>
      </Container>


 
    )
  }
} 
 


export default SideBar