import {
  CHANGE_LOADING_LOGIN,
  CHANGE_FIELD_LOGIN,
  CHANGE_LOADING_LOGADO,
  LOGIN_FIELD_RESET
} from '../../Types';

const INITIAL_STATE = {
  form: {
    login: '',
    senha: ''
  },
  loading_login_app: false,
  loading_login_logado: true
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
 
  	case CHANGE_LOADING_LOGIN:
      return {...state, loading_login_app: action.payload};
    case CHANGE_LOADING_LOGADO:
    return {...state, loading_login_logado: action.payload};
    case CHANGE_FIELD_LOGIN:
      return {...state, form:{...state.form, [action.objectItem]: action.payload}};
    case LOGIN_FIELD_RESET:
      return {...state, form: {...state.form, login: '', senha: ''}};
    default:
      return state;  
  }
}


