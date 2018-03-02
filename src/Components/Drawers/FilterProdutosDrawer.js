import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SidebarFilter from '../../Static/SidebarFilter';

class FilterProdutosDrawer extends Component{

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
        content={<SidebarFilter navigation={this.props.navigation} />}
        side='right'
        onClose={() => this.closeDrawer()} >

        {this.props.children}

      </Drawer>
    )
  }
}

export default FilterProdutosDrawer;