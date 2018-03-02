
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

class SideBarFilter extends Component {
  
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
       await this.getCategories() 
   }
     

  render() { 
 
    return (


  <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
       
          <ScrollView>
           
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
 
          </ScrollView>
          
        </Content>
      </Container>


 
    )
  }
} 
 


export default SideBarFilter