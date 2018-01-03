const INITIAL_STATE = {
	    loadingList:false,
	 }

export default (state = INITIAL_STATE, action) => {
	 
  switch(action.type){
  	   
  	case 'CHANGE_LIST_ITEM':
        return {lista: action.payload,loadingList:false}  
  
  	default:
  	  return state  
  }
}


