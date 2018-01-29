import React, { Component } from 'react';
import { withNavigation , NavigationActions } from 'react-navigation'


import { AppRegistry, View, Image, FlatList, StyleSheet, AsyncStorage, Alert,TouchableOpacity } from 'react-native';
import { ListItem, Body, Left, Right, Row, Text,List } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import IF from '../../../Helpers/if'

class DropdownMenu extends Component {
		 	constructor(props) {
		 		super(props);
		 		this.state = {
			      OpenMenu: false
			    }
		 	}

		  openItenMenu = () => {
		  	 this.setState({OpenMenu: !this.state.OpenMenu})
		  }
     
     onClickCategoria = (categoria) => {
     		const navigateAction = NavigationActions.navigate({
				  routeName: 'Categorias',
				  params: {
				  	categoria: categoria
				  },
        })

        this.props.navigation.dispatch(navigateAction)
     }
  	render() {

  	
    return (
    	<View>

        <ListItem itemDivider onPress={() => this.openItenMenu()}>
          <Body>
            <Text>{this.props.menu.name}</Text>
          </Body>
           <Right>
	             <Icon name="keyboard-arrow-right" style={{fontSize:22}}/>
	        </Right>
        </ListItem> 
          
				  <IF visible={this.state.OpenMenu}>
				          <List 
				            dataArray={this.props.menu.children}
				            renderRow={data => {
				              return ( 
				                 <ListItem onPress={() => this.onClickCategoria(data)}>
				                    <Body>
				                      <Text>{data.name}</Text>
				                    </Body>
				                 </ListItem> 

				                  )
				            }}
				          />
				  </IF>

       </View>
    )
  }
}
export default withNavigation(DropdownMenu)
