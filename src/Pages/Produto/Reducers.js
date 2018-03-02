import { Animated } from 'react-native';
import {
  LISTS_PRODUCTO,
  CHANGE_FIELD_PRODUTO,
  STATE_DEFAULT,
  STATE_SEARCH,
  CHANGE_FIELD_DETAILS,
  ADD_PRODUTO_LOADING
} from '../../Types';

const INITIAL_STATE = {
  produtos: [],
  loading: true,
  showButtonLoading: true,
  visibleType: 2,
  lastPage: 0,
  actualPage: 1,
  slideAnim: new Animated.Value(0),
  opensearch: false,
  search: '',
  _slug:'geral',
  activeSearch:false,
  add_produto_loading: false,
  informacao: '',
  details:{
    imagemDestaque: 'https://contem1gbeauty.com.br/img/produtos/002677_3_g.jpg',
    code: 0,
    quantidade:1,
    idDetails: 1
  }
}
 
export default (state = INITIAL_STATE, action) => {

  switch(action.type){
    case LISTS_PRODUCTO:
      return state;
    case CHANGE_FIELD_PRODUTO:
    console.log(action.payload);
    
      return {...state, [action.objectItem]: action.payload};
    case STATE_DEFAULT:
      return {
        ...state,
        activeSearch: false,
        opensearch: false,
        showButtonLoading:true,
        produtos: [],
        lastPage: 0,
        actualPage: 1,
        slideAnim: new Animated.Value(0),
        search: '' 
      };  
    case 'STATE_DEFAULT_ANIMATION':
      return {
        ...state,
        activeSearch: false,
        opensearch: false,
        showButtonLoading:true,
        slideAnim: new Animated.Value(0),
        search: '' 
      };  
    case STATE_SEARCH:
      return {...state, produtos: [], lastPage: 0, actualPage: 1 };
    case CHANGE_FIELD_DETAILS:
      return {...state, details:{...state.details , [action.objectItem]: action.payload}};
    case ADD_PRODUTO_LOADING:
      return {...state, add_produto_loading: action.payload};
    default:
      return state;
  }
}