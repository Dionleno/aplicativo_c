import React, { Component } from 'react';
import { 
  Container, 
  Content, 
  Text
} from 'native-base';
import HeaderExterno from '../../Static/HeaderExterno';
import HeaderDetalhes from './Components/Header';
import Dialog from './Components/Dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './Style';

class Detalhes extends Component {

  constructor(props){
    super(props);

  }
  
  render(){
    return (
      <Container>
        <HeaderDetalhes navigation={this.props.navigation} />
        <Content style={styles.dtContent}>
          <Dialog />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => (state.pedidos);
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);