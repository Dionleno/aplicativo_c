import {
	SET_PATROCINADORES,
	CHANGE_FIELD_PATROCINADOR,
	CHANGE_LOADING_PATROCINADOR,
	PATROCINADOR_LOADING_OVERLAY
} from '../../Types';

const INITIAL_STATE = {
	showLoader: false,
	complete: false,
	typeForm:true,
	findtext: '',
	findtextcep: '',
	user: [],
	coupon: '',
	overlay: false,
	origem: 'site'
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
  	case SET_PATROCINADORES:
			let user = [];
			user.push(action.payload);
			return {...state, user: user ,showLoader:false};
    case CHANGE_FIELD_PATROCINADOR:
      return {...state, [action.objectItem]: action.payload};
    case CHANGE_LOADING_PATROCINADOR:
			return {...state, showLoader: action.payload};
		case PATROCINADOR_LOADING_OVERLAY:
			return {...state, overlay: action.payload};
  	default:
  	  return state  
  }
}


