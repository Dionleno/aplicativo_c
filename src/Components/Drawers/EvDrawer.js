import React, { Component } from 'react'
import {AppRegistry} from 'react-native'
import {Drawer } from 'native-base';
import SideBarEv from '../../Static/SideBarEv';

class EvDrawer extends Component{
    constructor(props){
        super(props)
    }
    openDrawer() {
        this.drawer._root.open()
    }

    closeDrawer = () => {
      this.drawer._root.close()
    }

    render(){
        
        return(
            <Drawer
                ref={(_drawer) => this.drawer = _drawer}
                content={<SideBarEv navigation={this.props.navigation} />}
                onClose={() => this.closeDrawer()} >
            
                {this.props.children}
            
            </Drawer>
        ) 
        
    }
}

export default EvDrawer;