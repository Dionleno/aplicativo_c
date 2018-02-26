import { RequestGet, RequestAuth } from '../../Helpers/Http';
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
  RETIRADA_LOADING,
  RETIRADA_OVERLAY
} from '../../Types';

export const avancar = props => {
  return (dispatch, getState) => {
    const { retirada } = getState();
    const { form } = retirada;
    let data = {};

    dispatch(error(''));

    if(form.option == 1){
      if(!form.estado){
        dispatch(error('Selecione um estado!'));
        return;
      }

      if(!form.cd){
        dispatch(error('Selecione um CD!'));
        return;
      }else{
        data = {distribution_center_id: form.cd};
      }
    }

    dispatch(loading(true));
    
    RequestAuth('carts', 'POST', data)
      .then(response => response.json())
      .then(response => {
        console.log(response.data);
        dispatch(loading(false));
        props.navigation.navigate('Pedidos');
      })
      .catch(error => {
        console.log(error);
        dispatch(loading(false));
      });
  }
}

const loading = b => ({type: RETIRADA_LOADING, payload: b});

const error = mensagem => ({
  type: RETIRADA_ERRO,
  payload: mensagem
});

export const check = index => {
  return (dispatch, getState) => {
    dispatch({type: RETIRADA_CD_RESET});

    const { retirada } = getState();
    const { options } = retirada;
    let newOptions = [];

    options.map((item, i) => {
      item.selected = false;
      newOptions[i] = item;
    });

    newOptions[index].selected = true;

    if(index == 0){
      dispatch({type: RETIRADA_STATUS, payload: 0});
    }

    if(index == 1){
      dispatch(carregarEstados());
    }

    dispatch({type: RETIRADA_CHECK, payload: newOptions});
    dispatch({
      type: RETIRADA_CHANGE_FIELD, 
      item: 'option',
      payload: index
    });
  }
}

export const carregarEstados = () => {
  return dispatch => {
    dispatch({type: RETIRADA_STATUS, payload: 2});
    RequestGet('/general/cds_states')
      .then(response => response.json())
      .then(response => {
        dispatch({type: RETIRADA_STATES, payload: response.data});
        dispatch({type: RETIRADA_STATUS, payload: 1});
      })
      .catch(error => {
        dispatch({type: RETIRADA_STATUS, payload: 0});
        console.log(error);
      });
  }
}

export const changeField = (key, value) => {
  return dispatch => {
    if(key == 'estado'){
      dispatch({type: RETIRADA_CDS, payload: []});
    }

    dispatch({
      type: RETIRADA_CHANGE_FIELD,
      item: key,
      payload: value
    });
  }
};

export const carregarCDs = value => {
  return (dispatch, getState) => {
    if(value != ''){
      dispatch({type: RETIRADA_CD_PICKER_VISIBLE, payload: false});
      RequestGet(`general/distribution_centers/${value}`)
        .then(response => response.json())
        .then(response => {
          dispatch({type: RETIRADA_CDS, payload: response.data});
          dispatch({type: RETIRADA_CD_PICKER_VISIBLE, payload: true});
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}

// Faz a verificação de carrinho existente. 
// Se o carrinho existir, o usuário será direcionado para a tela de seleção de produtos
export const verificarCarrinhoAtivo = navigation => {
  return dispatch => {
    dispatch({type: RETIRADA_OVERLAY, payload: true});
    RequestAuth('carts', 'GET')
      .then(response => response.json())
      .then(response => {
        dispatch({type: RETIRADA_OVERLAY, payload: false});
        if(response.data){
          navigation.navigate('Pedidos');
        }
      })
      .catch(error => console.log(error));
  }
}