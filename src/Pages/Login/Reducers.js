const INITIAL_STATE = {
            form: {
              login: '',
              senha: ''
            },
            loading: false
          }

export default (state = INITIAL_STATE, action) => {
	 
  switch(action.type){
  	case 'CHANGE_LOADING':
      console.log(action)
         return {...state,loading:action.payload}
    case 'CHANGE_FIELD':
       
        return {...state,form:{...state.form, [action.objectItem]: action.payload}}         
  	default:
  	  return state  
  }
}


