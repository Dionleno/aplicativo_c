import {
  PEDIDOS_LOAD,
  PEDIDOS_DIALOG,
} from '../../Types';
import { RequestAuth } from '../../Helpers/Http';
import { MaskService } from 'react-native-masked-text';
import { MOEDAS } from '../../Helpers/Constants';

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
        visible: false
      }
    });
    
    RequestAuth(`orders?uid=${order}`, 'GET')
      .then(response => response.json())
      .then(response => {
        const { order, address, status, price, products } = response.data[0];
        dispatch({
          type: PEDIDOS_DIALOG,
          payload: {
            order,
            address: `${address.street}, ${address.number}, ${address.district}, ${address.city.name}, ${address.city.state.name}`,
            status: status.description,
            value: MaskService.toMask('money', price, MOEDAS.BLR),
            products,
            visible: true
          }
        });
        console.log('ORDER', response.data[0]);
      })
      .catch(error => console.log(error));
  }
}
