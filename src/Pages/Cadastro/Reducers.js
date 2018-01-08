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
      address:{
       street:'',
       number:'',
       zip:'',
       complement:'',
       district:'',
       city_id:'',
       address_type_id:1
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
       phone_company_id:'',
       distribution_center_id:'',
       shipping_method: false,
       zip:''
     },
     telephones: [{
       number: '', 
       phone_company_id: null, 
       phone_type_id: 1, 
       whatsapp: 0
     }],
     sponsor:{
       id:1
     },
     kit:{
       id:''
     }

   }

export default (state = INITIAL_STATE, action) => {
	 
  switch(action.type){
    case 'CHANGE_FIELD':
        return {...state, [action.objectItem]: action.payload}
    case 'CHANGE_FIELD_ADDRESS':
        return {...state,address:{...state.address , [action.objectItem]: action.payload}}
    case 'CHANGE_FIELD_USER':
        return {...state,user:{...state.user , [action.objectItem]: action.payload}} 
    case 'CHANGE_FIELD_PHONE':
        return {...state,telephones:[{...state.telephones[0] , [action.objectItem]: action.payload}]}           
    case 'CHANGE_LOADING':
        return {...state, showLoader: action.payload}   
  	default:
  	  return state  
  }
}


