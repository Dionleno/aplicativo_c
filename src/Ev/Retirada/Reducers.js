import {
  RETIRADA_CHECK,
  RETIRADA_SELECTED,
  RETIRADA_STATES,
  RETIRADA_STATUS,
  RETIRADA_CHANGE_FIELD,
  RETIRADA_CDS,
  RETIRADA_CD_RESET,
  RETIRADA_CD_PICKER_VISIBLE,
  RETIRADA_ERRO,
  RETIRADA_LOADING
} from '../../Types';

const INITIAL_STATE = {
  options: [
    {id: 0, label: 'Receber no Endereço', selected: true},
    {id: 1, label: 'Retirar no CD', selected: false},
  ],
  selected: 0,
  cd:{
    states:[],
    cds:[],
    visible: 0,
    picker_cd_visible: true
  },
  form: {
    option: 0,
    cd: 0,
    estado: 0
  },
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETIRADA_CHECK:
      return {...state, options: action.payload};
    case RETIRADA_STATES:
      return {...state, cd: {...state.cd, states: action.payload}};
    case RETIRADA_CDS:
      return {...state, cd: {...state.cd, cds: action.payload}};
    case RETIRADA_STATUS:
      return {...state, cd: {...state.cd, visible: action.payload}};
    case RETIRADA_CHANGE_FIELD:
      return {...state, form: {...state.form, [action.item]:action.payload}};
    case RETIRADA_CD_PICKER_VISIBLE:
      return {...state, cd: {...state.cd, picker_cd_visible: action.payload}};
    case RETIRADA_ERRO:
      return {...state, error: action.payload};
    case RETIRADA_LOADING:
      return {...state, loading: action.payload};
    case RETIRADA_CD_RESET:
      return {
        ...state, 
        cd: {
          ...state.cd, 
          states: [], 
          cds: []
        },
        form: {
          ...state.form,
          cd: 0,
          estado: 0
        }
      };
    default:
      return state;
  }
}