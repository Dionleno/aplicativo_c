import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Row, Col, View, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import styles from './Style';

export class filter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row style={styles.row}>
        <Col>
          <View style={styles.view}>
            <TouchableOpacity 
              small 
              iconLeft 
              style={styles.touchButton}
              onPress={this.props.FilterDrawer}>
              <Icon name='tune' style={styles.icon} />
              <Text style={styles.text}>Categorias</Text>
            </TouchableOpacity>
          </View>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => (state.produto)
const mapDispatchToProps = dispatch => bindActionCreators({},dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(filter)
