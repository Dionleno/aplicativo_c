import {
  CHANGE_FIELD_KIT,
  CHANGE_FIELD_KIT_OBJECT
} from '../../Types';

const INITIAL_STATE = {
  kits: [],
  kit:{
    id:0
  },
  overlay:false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case CHANGE_FIELD_KIT:
      return {...state, kit:{id: action.payload}}
    case CHANGE_FIELD_KIT_OBJECT:
      return {...state, [action.objectItem]: action.payload}
    default:
      return state;  
  }
}


