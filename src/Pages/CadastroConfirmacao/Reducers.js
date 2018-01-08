const INITIAL_STATE = {
	    issetCart:0,
	 }

export default (state = INITIAL_STATE, action) => {
	
  switch(action.type){
  	   
  	case 'CHANGE_ITEM_CART':
     console.log(action.type)
        return {issetCart: action.payload}  
  
  	default:
  	  return state  
  }
}


