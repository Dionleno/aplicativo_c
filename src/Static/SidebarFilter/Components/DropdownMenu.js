import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeItem } from '../../../Pages/Produto/Actions'


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
				                 <ListItem onPress={() => this.props.changeItem("_slug",data.slug)}>
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

const mapStateToProps = state => (state.produto)
const mapDispatchToProps = dispatch => bindActionCreators({ changeItem }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu)  
 
