import {
  PEDIDOS_LOAD
} from '../../Types';
import { RequestAuth } from '../../Helpers/Http';

export const loadPedidos = () => {
  return dispatch => {
    console.log('Carregando pedidos...');

    RequestAuth('orders', 'GET')
      .then(response => response.json())
      .then(response => {
        console.log(response.data);
        dispatch({type: PEDIDOS_LOAD, payload: response.data});
      })
      .catch(error => console.log(error));
  }
}