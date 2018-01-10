
import { Animated } from 'react-native';
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
        activeSearch:false,
        details:{
          imagemDestaque: 'https://contem1gbeauty.com.br/img/produtos/002677_3_g.jpg',
          code: 0,
          quantidade:1,
          idDetails: 1
        }
      }
 
export default (state = INITIAL_STATE, action) => {
	 
  switch(action.type){
  	   
  	case 'LISTS_PRODUCTO':
        return state
    case 'CHANGE_FIELD_PRODUTO':
         return {...state, [action.objectItem]: action.payload}
    case 'STATE_DEFAULT':
     
          return {...state,
              activeSearch: false,
              opensearch: false,
              showButtonLoading:true,
              produtos: [],
              lastPage: 0,
              actualPage: 1,
              slideAnim: new Animated.Value(0),
              search:'' 
            } 
    case 'STATE_SEARCH':
        console.log('teste')
        return {...state, produtos: [],lastPage: 0,actualPage: 1 }    
    case 'CHANGE_FIELD_DETAILS':
         return {...state,details:{...state.details , [action.objectItem]: action.payload}}
    default:
  	  return state  
  }
}
 




