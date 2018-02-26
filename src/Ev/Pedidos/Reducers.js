import {
  PEDIDOS_LOAD, PEDIDOS_DIALOG
} from '../../Types';

const INITIAL_STATE = {
  order: 0,
  pedidos: [],
  loading: true,
  dialog: {
    visible: false,
    order: '',
    status: '',
    address: '',
    value: '',
    products: []
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PEDIDOS_LOAD:
      return {...state, pedidos: action.payload, loading: false};
    case PEDIDOS_DIALOG:
      return {
        ...state, 
        dialog: {
          ...state.dialog,
          order: action.payload.order,
          status: action.payload.status,
          address: action.payload.address,
          value: action.payload.value,
          products: action.payload.products,
          shipping: action.payload.shipping,
          shipping_company: action.payload.shipping_company,
          cycle: action.payload.cycle,
          visible: action.payload.visible
        }
      };
    default:
      return state;
  }
}