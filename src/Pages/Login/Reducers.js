const INITIAL_STATE = {
  form: {
    login: '',
    senha: ''
  },
  loading_login_app: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
  	case 'CHANGE_LOADING_LOGIN':
      return {...state, loading_login_app: action.payload}
    case 'CHANGE_FIELD':
      return {...state, form:{...state.form, [action.objectItem]: action.payload}}         
    default:
      return state;  
  }
}


