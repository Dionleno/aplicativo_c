import {
  PEDIDOS_LOAD
} from '../../Types';

const INITIAL_STATE = {
  pedidos: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PEDIDOS_LOAD:
      return {...state, pedidos: action.payload};
      
    default:
      return state;
  }
}