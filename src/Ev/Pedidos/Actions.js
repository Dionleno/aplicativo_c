import {
  PEDIDOS_LOAD,
  PEDIDOS_DIALOG,
} from '../../Types';
import { Alert } from 'react-native';
import { RequestAuth } from '../../Helpers/Http';
import { MaskService } from 'react-native-masked-text';
import { MOEDAS } from '../../Helpers/Constants';
import _ from 'lodash';

export const loadPedidos = () => {
  return dispatch => {
    RequestAuth('orders', 'GET')
      .then(response => response.json())
      .then(response => {
        dispatch({type: PEDIDOS_LOAD, payload: response.data});
      })
      .catch(error => console.log(error));
  }
}

export const dialog = order => {
  return dispatch => {
    dispatch({
      type: PEDIDOS_DIALOG,
      payload: {
        order: '',
        address: '',
        status: '',
        value: '',
        products: [],
        shipping: '',
        shipping_company: {},
        cycle: '',
        visible: false
      }
    });
    
    RequestAuth(`orders?uid=${order}`, 'GET')
      .then(response => response.json())
      .then(response => {
        const item = _.first(response.data);

        const { 
          order, 
          address, 
          status, 
          price, 
          products, 
          shipping,
          shipping_company,
          cycle
        } = item;

        dispatch({
          type: PEDIDOS_DIALOG,
          payload: {
            order,
            address: `${address.street}, ${address.number}, ${address.district}, ${address.city.name}, ${address.city.state.name}`,
            status: status.description,
            value: MaskService.toMask('money', price, MOEDAS.BLR),
            products,
            shipping: MaskService.toMask('money', parseFloat(shipping).toFixed(2), MOEDAS.BLR),
            shipping_company,
            cycle: cycle.description,
            visible: true
          }
        });
      })
      .catch(error => console.log(error));
  }
}

export const cancelar = () => {
  return dispatch => {
    Alert.alert(
      'Atenção',
      'Deseja cancelar este pedido?',
      [
        {text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Sim', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    );
  }
}
