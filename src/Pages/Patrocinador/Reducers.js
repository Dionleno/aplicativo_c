const INITIAL_STATE = {
	         showLoader: false,
           complete: false,
           typeForm:true,
           findtext: '',
           findtextcep: '',
           user: [],
           coupon: '',
	 }

export default (state = INITIAL_STATE, action) => {
	 
  switch(action.type){
  	   
  	case 'SET_PATROCINADORES':
         let user = []
         user.push(action.payload)
        return {...state, user: user ,showLoader:false}  
    case 'CHANGE_FIELD':
        return {...state, [action.objectItem]: action.payload}   
    case 'CHANGE_LOADING':
        return {...state, showLoader: action.payload}   
  	default:
  	  return state  
  }
}


