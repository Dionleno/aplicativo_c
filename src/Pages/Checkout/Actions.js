/**
 * 
 * Actions da tela de Checkout
 */

import { Alert, MaskedView } from 'react-native';
import { RequestAuth } from '../../Helpers/Http';
import AdyenCse from '../../Helpers/AdyenCse';
import { ADYEN_KEY } from '../../Helpers/Constants';
import { MaskService } from 'react-native-masked-text';
import { MOEDAS } from '../../Helpers/Constants';
import _ from 'lodash';
import {
  LISTAR_ENDERECOS,
  CHANGE_ADDRESS,
  FORMAS_ENTREGA,
  FORMA_PAGAMENTO,
  PRODUTOS,
  FACTORY,
  TOTAL,
  TOTAL_DIFF,
  KIT,
  CHANGE_FRETE,
  CARTAO_ANO,
  CARTAO_CVV,
  CARTAO_MES,
  CARTAO_NUMERO,
  CARTAO_TITULAR,
  CARTAO_TOTAL,
  ADD_CARD,
  ADD_CARD_LABEL,
  RENEW_CARD,
  RENEW_CARD_LABEL,
  PARCELAS,
  INSTALLMENT_ID,
  LOAD_OVERLAY,
  CHECKOUT_CADASTRO_ERRO,
  LOAD_FORMAS_ENTREGA
} from '../../Types';

// Lista os endereços de entrega do usuário logado
export const listarEnderecosEntrega = () => {
  return dispatch => {
    RequestAuth('users', 'GET')
      .then(response => response.json())
      .then(response => {
        dispatch({type: LISTAR_ENDERECOS, payload: response.data.addresses}); 
      })
      .catch(error => console.log(error));
  }
}

export const setAddressId = value => {
  return {
    type: CHANGE_ADDRESS,
    payload: value
  }
}

// Lista as formas de entrega de acordo com o endereço escolhido
export const listarFormasEntrega = cep => {
  return dispatch => {
    dispatch(loadFormasEntrega(1));
    
    RequestAuth('carts', 'PATCH', {zip_code: cep})
      .then(response => response.json())
      .then(response => {
        dispatch({ type: FORMAS_ENTREGA, payload: response.data.shipments });
        dispatch(loadFormasEntrega(-1));
      })
      .catch(error => console.log(error));
  };
}

export const getCart = () => {
  return dispatch => {
    RequestAuth('carts', 'GET')
      .then(response => response.json())
      .then(response => {
        const products = response.data.products;
        const total = response.data.total;

        dispatch({type: PRODUTOS, payload: products});
        dispatch({type: FACTORY, payload: response.data.distribution_center.factory});
        dispatch({type: TOTAL, payload: total});
        dispatch({type: TOTAL_DIFF, payload: total});
        dispatch(setKit(products));

        console.log('Carrinho', response);
      })
      .catch(error => {
        // console.log(error);
        // console.log('Kits não está definido');
      });
  };
}

export const setKit = products => {
  let kit = [];

  for(let i = 0; i < products.length; i++){
    // Se o tamanho do kit do array produtos for maior que 0, o produto é um kit
    if(products[i].detail.kits.length > 0){
      kit = products[i];
      break;
    }
  }
  
  const titulo = kit.detail.kits[0].name;
  const descricao = kit.detail.kits[0].description;
  const valor = MaskService.toMask('money', kit.price.value, MOEDAS.BLR);
  const imagem = kit.detail.medias[0].url;
  const pontos = kit.detail.points[0].value;

  return {
    type: KIT,
    payload: {
      titulo,
      descricao,
      valor,
      imagem,
      pontos
    }
  }
}

export const selecionarFrete = index => {
  return {
    type: CHANGE_FRETE, 
    payload: index
  };
}

export const cartaoTitular = value => {
  return {
    type: CARTAO_TITULAR,
    payload: value
  };
}

export const cartaoNumero = value => {
  return {
    type: CARTAO_NUMERO,
    payload: value
  };
}

export const cartaoCVV = value => {
  return {
    type: CARTAO_CVV,
    payload: value
  };
}

export const cartaoMes = value => {
  return {
    type: CARTAO_MES,
    payload: value
  };
}

export const cartaoAno = value => {
  return {
    type: CARTAO_ANO,
    payload: value
  };
}

export const cartaoTotal = value => {
  return {
    type: CARTAO_TOTAL,
    payload: value
  };
}

export const formaPagamento = value => {
  
  // Boleto
  if(value == '1'){
    return {
      type: FORMA_PAGAMENTO,
      payload: value
    };
  }
  
  // Cartão de crédito
  if(value == '2'){
    return (dispatch, getState) => {
      // Seta a forma de pagamento
      dispatch({type: FORMA_PAGAMENTO, payload: value });
      
      // Seta o valor total para o JSON cartão
      dispatch({type: CARTAO_TOTAL, payload: getState().checkout.total });

      // Calcula as parcelas com base no valor total
      dispatch(calcularParcelas(getState().checkout.total));
    }
  }
}

/**
 * Enviar um GET para 'carts/installments/{value}'
 */
export const calcularParcelas = value => {
  return dispatch => {
    let total = MaskService.toMask('money', value, {
      unit: '',
      separator: '.',
      delimiter: '|'
    });

    total = total.replace('|', '');

    RequestAuth('carts/installments/' + total, 'GET')
    .then(response => response.json())
    .then(parcelas =>  dispatch(setParcelas(parcelas)))
    .catch(error => console.log(error));
  }
}

export const cadastrarCartao = (popupDialogCartao) => {

  return (dispatch, getState) => {
    const { checkout } = getState();

    let card = {
      value: MaskService.toMask('money', checkout.cartao.total, {
        unit: '',
        separator: ',',
        delimiter: '.'
      }),
      label: MaskService.toMask('money', checkout.cartao.total, {
        unit: 'R$ ',
        separator: ',',
        delimiter: '.'
      }),
      diff: MaskService.toMask('money', checkout.cartao.total, {
        unit: '',
        separator: '.',
        delimiter: '|'
      })
    };

    AdyenCse.generateCSE(
      ADYEN_KEY,
      checkout.cartao.titular.toString(),
      checkout.cartao.numero.toString().replace(' ', ''),
      checkout.cartao.cvv.toString(),
      checkout.cartao.mes.toString(),
      checkout.cartao.ano.toString()
    )
    .then(encrypt => {
      dispatch(
        addCard(
          {
            card: encrypt.response,
            value: card.value,
            installment_id: checkout.cartao.installment_id
          }
        )
      );

      dispatch(
        addCardLabel(
          {
            numero: checkout.cartao.numero,
            valor: card.label,
            parcelas: checkout.parcelas[checkout.cartao.installment_id].label
          }
        )
      );

      popupDialogCartao.dismiss();

      let cardValue = parseFloat(card.diff.replace('|', ''));
      let diff = checkout.total_diff-cardValue;

      dispatch({type: TOTAL_DIFF, payload: diff});
      dispatch({type: CARTAO_TOTAL, payload: diff});
      dispatch(calcularParcelas(diff));

      dispatch({type: CARTAO_TITULAR, payload: ''});
      dispatch({type: CARTAO_NUMERO, payload: ''});
      dispatch({type: CARTAO_CVV, payload: ''});
      dispatch({type: CARTAO_MES, payload: 1});
    })
    .catch(error => {
      Alert.alert('Atenção', 'Verifique os dados do seu cartão de crédito');
    });
  }
}

export const addCard = card => {
  return {
    type: ADD_CARD,
    payload: card
  }
}

export const addCardLabel = card => {
  return {
    type: ADD_CARD_LABEL,
    payload: card
  }
}

export const removeCard = (index) => {
  return (dispatch, getState) => {
    Alert.alert
    (
      'Atenção', 
      'Deseja remover este cartão?',
      [
        {
          text: 'Cancelar', 
          onPress: () => null, 
          style: 'cancel'
        },
        {
          text: 'Remover', 
          onPress: () => {
            const { cards, cards_label, total_diff } = getState().checkout;

            let value =  MaskService.toMask('money', cards[index].value, {
              unit: '',
              separator: '.',
              delimiter: '|'
            });
            value = parseFloat(value.replace('|', ''));
            let diff = total_diff+value;
        
            let newCards = cards.splice(index, 1);
            let newCardsLabel = cards_label.splice(index, 1);
            
            dispatch({type: RENEW_CARD});
            dispatch({type: RENEW_CARD_LABEL});
            dispatch({type: TOTAL_DIFF, payload: diff});
            dispatch({type: CARTAO_TOTAL, payload: diff});
            dispatch(calcularParcelas(diff));
          }
        }
      ],
      {cancelable: true}
    );
  }
}

export const setParcelas = value => {
  let parcelas = [];
				
  value.map((item, index) => {
    parcelas.push({key: index, label: item});
  });

  return {
    type: PARCELAS,
    payload: parcelas
  };
}

export const setInstallmentId = value => {
  return {
    type: INSTALLMENT_ID,
    payload: value
  }
}

export const loadFinalizarCadastro = value => {
  return {
    type: LOAD_OVERLAY,
    payload: value
  }
}

export const loadFormasEntrega = value => {
  return {
    type: LOAD_FORMAS_ENTREGA,
    payload: value
  };
}

export const verificarValorCartao = () => {
  return (dispatch, getState) => {
    const { checkout } = getState();
    
    let total = MaskService.toMask('money', checkout.cartao.total, {
      unit: '',
      separator: '.',
      delimiter: '|'
    });
    
    total = parseFloat(total.replace('|', ''));

    if(total > checkout.total_diff){
      Alert.alert('Atenção', 'O valor digitado excede o valor do pedido');
      dispatch({type: CARTAO_TOTAL, payload: checkout.total_diff});
    }else{
      dispatch(calcularParcelas(total));
    }
  }
}

export const finalizarCadastro = props => {

  return (dispatch, getState) => {
    const { checkout } = getState();

    if(!checkout.address_id && checkout.factory == '1'){
      Alert.alert('Atenção', 'Escolha um endereço para entrega');
      return {
        type: CHECKOUT_CADASTRO_ERRO
      }
    }

    if(!checkout.forma_pagamento && checkout.factory == '1'){
      Alert.alert('Atenção', 'Escolha uma forma de pagamento');
      return {
        type: CHECKOUT_CADASTRO_ERRO
      }
    }

    if(checkout.forma_pagamento == '2' && checkout.cards.length == 0){
      Alert.alert('Atenção', 'Você deve informar pelo menos um cartão de crédito');
      return {
        type: CHECKOUT_CADASTRO_ERRO
      }
    }

    if(checkout.forma_pagamento == '2' && checkout.total_diff > 0){
      Alert.alert('Atenção', 'Existem valores pendentes de Cartão de Crédito.\nInforme mais um Cartão de Crédito para completar os valores.');
      return {
        type: 'CADASTRO_ERRO'
      }
    }
    
    dispatch(loadFinalizarCadastro(true));
    dispatch(enviarCadastroParaApi(props));
    
  };

}


/**
 * Enviar um POST para carts/checkout com os parâmetros:
 * payment_method_id = 1 para Boleto ou 2 para Cartão de Crédito
 * Se o pagamento for com o cartão, enviar um array com os valores ['string_adyen', 'valor', 'installments_id'] -> O installment_id é o retorno do GET 'carts/installments/{value}'
 */
export const enviarCadastroParaApi = (props, encrypt = '') => {
  return (dispatch, getState) => {
    const { checkout } = getState();
    let data = {};

    if(checkout.factory == 1){
      data = {
        payment_method_id: checkout.forma_pagamento,
        address_id: checkout.address_id
      }
      
      if(checkout.forma_pagamento == '2'){
        data.cards = checkout.cards;
      }
    }

    RequestAuth('carts', 'GET')
      .then(response => response.json())
      .then(response => {
        const products = response.data.products;
        let checkout = true;

        for(let i = 0; i < products.length; i++){
          const { detail } = products[i];
          const stock = _.first(detail.stocks).amount_virtual;
          if(stock <= 0){
            checkout = false;
            break;
          }
        }

        if(!checkout){
          dispatch(loadFinalizarCadastro(false));
          props.navigation.navigate('Carrinho');
          return;
        }

        RequestAuth('carts/checkout', 'POST', data)
          .then(response => response.json())
          .then(response => {
            if(response.error){
              Alert.alert('Atenção', response.error.message);
              console.log(response);
              dispatch(loadFinalizarCadastro(false));
            }
            
            if(response.data){
              dispatch(loadFinalizarCadastro(false));
              props.navigation.navigate('CadastroAgradecimento', {response: response.data});
            }

            dispatch(loadFinalizarCadastro(false));
          })
          .catch(error => {
            Alert.alert('Atenção', 'Ocorreu um erro ao gerar o pedido.\nTente novamente mais tarde');
            dispatch(loadFinalizarCadastro(false));
            console.log(error);
          });
        })
        .catch(error => {
          console.log(error);
        });
  }
}