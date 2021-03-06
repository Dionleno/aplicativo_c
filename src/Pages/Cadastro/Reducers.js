import {
  CHANGE_FIELD,
  CHANGE_FIELD_ADDRESS,
  CHANGE_FIELD_USER,
  SET_FIELD_PHONE,
  CHANGE_FIELD_PHONE,
  CHANGE_LOADING,
  SPINNER_OVERLAY,
  DATA_PHONE_COMPANY,
  DATA_PHONE_TYPES,
  CHANGE_PHONE_NUMBER,
  CHANGE_PHONE_COMPANY,
  CHANGE_PHONE_TYPE,
  CHANGE_PHONE_TYPE_LABEL,
  ADD_PHONE,
  CHANGE_CONTATO_LOADING
} from '../../Types';

const INITIAL_STATE = {
  checked: false, 
  listoperadora: [],
  cities:[],
  kits:[],
  centers:[],
  centers_state:[],
  centers_state_id:'',
  states: [],
  errors: [],
  coupon: '',
  couponKey: '',
  coupon_ativo: false,
  overlay: false,
  phone_number: '',
  whatsappset: false,
  contato_loading: false,
  phone_types:  {
    data: [{id: 0, description: 'Aguarde...'}],
    selected: 0,
    description: ''
  },
  phone_companies: {
    data: [{id: 0, name: 'Aguarde...'}],
    selected: 0
  },
  address:{
    street:'',
    number:'',
    zip:'',
    complement:'',
    district:'',
    state_id: 0,
    city_id:0,
    address_type_id:1,
    reference: ''
  },
  user: {
    name:'',
    login:'',
    document:'',
    email:'',
    email_confirmation:'',
    minisite:'',
    birth_date:'',
    password:'',
    password_confirmation:'',
    cellphone:'',
    // phone_company_id:'',
    distribution_center_id:'',
    shipping_method: false,
    zip:''
  },
  telephones: [],
  /*telephones: [{
    number: '(11) 99876-9981', 
    phone_company_id: null, 
    phone_type_id: 2,
    phone_type_label: 'Residencial',
    whatsapp: 0
  }], */
  sponsor:{
    id:0
  },
  kit:{
    id:''
  }
}

const removePhone = (fhones, id) => {
  // return a new list with all values, except the matched id
  return fhones.filter( (memberId,index) => index !== id);
}

export default (state = INITIAL_STATE, action) => {
	 
  switch(action.type){
    case CHANGE_FIELD:
      return {...state, [action.objectItem]: action.payload}
    case CHANGE_FIELD_ADDRESS:
      return {...state,address:{...state.address , [action.objectItem]: action.payload}}
    case CHANGE_FIELD_USER:
      return {...state,user:{...state.user , [action.objectItem]: action.payload}} 
    case SET_FIELD_PHONE:
      console.log(removePhone(state.telephones, action.payload))
      return {...state,telephones: removePhone(state.telephones, action.payload) }    
    case CHANGE_FIELD_PHONE:
      return {...state,telephones:[{...state.telephones, [action.objectItem]: action.payload}]}           
    case CHANGE_LOADING:
      return {...state, showLoader: action.payload} 
    case SPINNER_OVERLAY:
      return {...state, overlay: action.payload};
    case DATA_PHONE_COMPANY:
      return {...state, phone_companies: {...state.phone_companies, data: action.payload}};
    case DATA_PHONE_TYPES:
      return {...state, phone_types: {...state.phone_types, data: action.payload}};
    case CHANGE_PHONE_NUMBER:
      return {...state, phone_number: action.payload};
    case CHANGE_PHONE_COMPANY:
      return {...state, phone_companies: {...state.phone_companies, selected: action.payload}};
    case CHANGE_PHONE_TYPE:
      return {...state, phone_types: {...state.phone_types, selected: action.payload}};
    case CHANGE_PHONE_TYPE_LABEL:
      return {...state, phone_types: {...state.phone_types, description: action.payload}};
    case CHANGE_CONTATO_LOADING:
      return {...state, contato_loading: action.payload};
    case ADD_PHONE:
      return {
        ...state, 
        telephones: [...state.telephones, action.payload]
      };
  	default:
  	  return state  
  }
}


