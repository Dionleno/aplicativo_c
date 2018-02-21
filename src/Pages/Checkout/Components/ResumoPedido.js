import React, {Component} from 'react';
import { View, Image, FlatList } from 'react-native';
import { Row, Text, ListItem, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../Styles';
import { finalizarCadastro } from '../Actions';
import stylesGlobal from '../../../StyleSheet/Buttons';
import { MaskService } from 'react-native-masked-text';
import { MOEDAS } from '../../../Helpers/Constants';

class ResumoPedido extends Component {
  
  constructor(props){
    super(props);
  }

  // Renderiza o Flatlist de produtos
  renderListProdutos = ({item}) => {
    // Renderiza somente produtos sem o kit
    if(item.detail.kits.length === 0) {
      const titulo = item.detail.product.name;
      const preco = MaskService.toMask('money', item.price.value, MOEDAS.BLR);
      const pontos = item.detail.points[0].value + 'pts';

      return (
        <ListItem style={styles.resumoListItemProdutos}>
          <Text style={[styles.resumoTexto, {textAlign: 'left'}]}>{titulo}</Text>
        </ListItem>
      );
    }
  }

  kit = () => {
    if(this.props.kit_visible){
      const kitValor = MaskService.toMask('money', this.props.kit.valor, MOEDAS.BLR);
      
      return (
        <View>
          <View style={styles.resumoKit}>
            <Text style={styles.resumoTitle}>{this.props.kit.titulo}</Text>
            <Text style={styles.resumoTexto}>Pontos: {this.props.kit.pontos}</Text>
            <Image style={{ width: 270, height: 150, marginVertical: 7.5 }} source={{ uri: this.props.kit.imagem }} />
            <Text style={styles.resumoTexto}>{this.props.kit.descricao}</Text>
          </View>
    
          <View style={styles.resumoValores}>
            <Text style={styles.resumoTexto}>Valor do Kit: {kitValor}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    const pedidoValor = MaskService.toMask('money', this.props.total, MOEDAS.BLR);

    return (
      <View>
        <Row style={styles.title} >
          <Text style={styles.titleText}>Resumo do pedido</Text>
        </Row>
    
        <View style={styles.resumo}>
    
          {this.kit()}
    
          <FlatList
            style={styles.listProdutos}
            data={this.props.produtos}
            keyExtractor={item => item.id}
            renderItem={this.renderListProdutos}
          />
    
          <View style={styles.resumoValores}> 
            <Text style={styles.resumoTexto}>Valor do Pedido: {pedidoValor}</Text>
          </View>
        </View>

        <View>
          <View style={styles.bottom}>
            <Button block style={stylesGlobal.btnPrimary} onPress={() => {this.props.finalizarCadastro(this.props)}}>
              <Text style={stylesGlobal.btnPrimaryText} >Finalizar Pedido</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => (state.checkout);
const mapDispatchToProps = dispatch => bindActionCreators({ finalizarCadastro }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ResumoPedido);