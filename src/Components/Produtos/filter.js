import React, { Component } from 'react'
import { connect } from 'react-redux'
import {TouchableOpacity} from 'react-native'
import {Row,Col,View,Text,Button} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../../Pages/Produto/Style'
import { bindActionCreators } from 'redux';

export class filter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row style={{ paddingHorizontal: 5, paddingVertical: 5, backgroundColor: '#F2f2f2',height: 40 }}>
               
                <Col>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end',alignItems:'center',height: 30 }}>
                        <TouchableOpacity small iconLeft style={{backgroundColor:'transparent',flexDirection: 'row',alignItems:'center',paddingRight:10}}
                                                onPress={this.props.FilterDrawer}>
                            <Icon name='tune' style={{ fontSize: 24, marginRight:6 }} />
                            <Text style={{color:"#333333",fontSize:13}}>Categorias</Text>
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
