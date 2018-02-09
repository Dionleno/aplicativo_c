
import React, { Component } from 'react';
import {
  ImageBackground,
  ScrollView, 
  AsyncStorage
} from 'react-native';

import styles from "./Style";

import { Content, Text, List, ListItem, Container, View, Thumbnail, Body } from 'native-base';
import { USER_INFO } from '../../Helpers/Constants';
import { RequestGet,LogOutSistem } from '../../Helpers/Http';  
class SideBarEv extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      Userinfo: {name: 'Cliente' },
      RouteMenu: []
    }
  }

  componentWillMount = async() => {
    const Userinfo = await AsyncStorage.getItem(USER_INFO);
    console.log('USER', Userinfo);

    this.setState({
      Userinfo: JSON.parse(Userinfo)
    })
  }
     

  render() { 
 
    return (
      <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
          <ImageBackground source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwI1ke65_qgz9cmETDjXrfteGdhH5GOOwCrHU_-cZ5mrXJz7RZ"}} style={styles.drawerCover} >
            <View style={styles.avatarAlfa}></View>
              <View style={styles.avatarView}>
              <Thumbnail source={{uri: "https://guiadasempresas.com.br/wp-content/uploads/750x750_13f49be6-2cbf-4665-be16-14f91ee86b13.png"}} large />
            </View>
            <View>
              <Text style={styles.avatarName}>{this.state.Userinfo.name}</Text>
            </View>
          </ImageBackground>

          <ScrollView>
            <List>
              <ListItem itemDivider onPress={() => this.props.navigation.navigate('HomeEv') }>
                <Body>
                  <Text>Home</Text>
                </Body>
              </ListItem> 
            </List>

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

export default SideBarEv;