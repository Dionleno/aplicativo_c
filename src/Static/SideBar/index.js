
import React, { Component } from 'react';
import {
  Platform,
   AppRegistry, Image, ImageBackground ,ScrollView,StyleSheet,AsyncStorage
} from 'react-native';

import styles from "./Style";

import {Content,Text,List,ListItem,Container,Left,Right,Button,View,Thumbnail, Body,FlatList} from 'native-base';
import {SafeAreaView, DrawerItems} from 'react-navigation';
import { USER_INFO ,URL_API } from '../../Helpers/Constants';
import { RequestGet,LogOutSistem } from '../../Helpers/Http';  
 
import IF from '../../Helpers/if'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinkMenu from './Components/LinkMenu'
import DropdownMenu from './Components/DropdownMenu'
import { withNavigation } from 'react-navigation';

class SideBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Userinfo: {name: 'Cliente' },
      RouteMenu: []
    }
  }

  getCategories = async() =>{

  
      RequestGet('categories/')
      .then(resp => resp.json())
      .then(resp => {
           
             this.setState({
                RouteMenu: resp.data
              })
      })
      .catch(error => console.log(error))
  }

  componentWillMount = async() => {
    const Userinfo = await AsyncStorage.getItem(USER_INFO);
    console.log('USER', Userinfo);
    
    await this.getCategories() 

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
          <List>
             <ListItem itemDivider onPress={() => this.props.navigation.navigate('Produto') }>
                <Body>
                  <Text>Produtos</Text>
                </Body>
              </ListItem> 
              </List>
            <List
            dataArray={this.state.RouteMenu}
            renderRow={data => {   
              return (

                 <View>
                  
                      <IF visible={data.children.length > 0}>
                          <DropdownMenu menu={data} />
                      </IF>   
                      
                      <IF visible={data.children.length === 0}>
                         <LinkMenu name={data} />
                      </IF>

                   
                  </View>


                 
                
              );
            }}
          />

          <List>
             <ListItem itemDivider onPress={() => LogOutSistem(this.props)}>
                <Body>
                  <Text>Logout</Text>
                </Body>
              </ListItem> 
              </List>
          </ScrollView>
          
        </Content>
      </Container>


 
    )
  }
} 
 


export default withNavigation(SideBar); 