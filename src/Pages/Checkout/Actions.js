/**
 * 
 * Actions da tela de Checkout
 */

import { Alert } from 'react-native';
import { RequestAuth } from '../../Helpers/Http';
import AdyenCse from '../../Helpers/AdyenCse';
import { ADYEN_KEY } from '../../Helpers/Constants';

// Lista os endereços de entrega do usuário logado
export const listarEnderecosEntrega = () => {
  return dispatch => {
    RequestAuth('users', 'GET')
      .then(response => response.json())
      .then(response => {
        dispatch({type: 'LISTAR_ENDERECOS', payload: response.data.addresses}); 
      })
      .catch(error => console.log(error));
  }
}

export const setAddressId = value => {
  return {
    type: 'CHANGE_ADDRESS',
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
        dispatch({ type: 'FORMAS_ENTREGA', payload: response.data.shipments });
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

        dispatch({type: 'PRODUTOS', payload: products});
        dispatch({type: 'FACTORY', payload: response.data.distribution_center.factory});
        dispatch({type: 'TOTAL', payload: total});
        dispatch(setKit(products));

        console.log('Carrinho', response);
      })
      .catch(error => console.log(error));
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
  const valor = 'R$ ' + kit.price.value;
  const imagem = kit.detail.medias[0].url;
  const pontos = kit.detail.points[0].value;

  return {
    type: 'KIT',
    payload: {
      titulo,
      descricao,
      valor,
      imagem,
      pontos
    }
  }
}

/**
 * Enviar um GET para 'carts/installments/{value}'
 */
export const calcularParcelas = () => {
  RequestAuth('carts/installments/' + this.state.total, 'GET', null,
    response => {
      let parcelas = [];
      
      response.map((item, index) => {
        parcelas.push({key: index, label: item});
      });

      this.setState({ parcelas });
    },
    error => console.log(error)
  );
}

export const selecionarFrete = index => {
  return {
    type: 'CHANGE_FRETE', 
    payload: index
  };
}

export const cartaoTitular = value => {
  return {
    type: 'CARTAO_TITULAR',
    payload: value
  };
}

export const cartaoNumero = value => {
  return {
    type: 'CARTAO_NUMERO',
    payload: value
  };
}

export const cartaoCVV = value => {
  return {
    type: 'CARTAO_CVV',
    payload: value
  };
}

export const cartaoMes = value => {
  return {
    type: 'CARTAO_MES',
    payload: value
  };
}

export const cartaoAno = value => {
  return {
    type: 'CARTAO_ANO',
    payload: value
  };
}

export const formaPagamento = value => {
  
  // Boleto
  if(value == '1'){
    return {
      type: 'FORMA_PAGAMENTO',
      payload: value
    };
  }
  
  // Cartão de crédito
  if(value == '2'){
    return (dispatch, getState) => {
      RequestAuth('carts/installments/' + getState().checkout.total, 'GET')
        .then(response => response.json())
        .then(parcelas => {
          dispatch(setParcelas(parcelas));

          dispatch({
            type: 'FORMA_PAGAMENTO',
            payload: value
          });

        })
    }
  }
}

export const setParcelas = value => {
  let parcelas = [];
				
  value.map((item, index) => {
    parcelas.push({key: index, label: item});
  });

  return {
    type: 'PARCELAS',
    payload: parcelas
  };
}

export const setInstallmentId = value => {
  return {
    type: 'INSTALLMENT_ID',
    payload: value
  }
}

export const loadFinalizarCadastro = value => {
  return {
    type: 'LOAD_OVERLAY',
    payload: value
  }
}

export const loadFormasEntrega = value => {
  return {
    type: 'LOAD_FORMAS_ENTREGA',
    payload: value
  };
}

export const finalizarCadastro = _this => {

  return (dispatch, getState) => {
    const checkout = getState().checkout;

    if(checkout.factory == '1'){

      if(!checkout.address_id){
        Alert.alert('Atenção', 'Escolha um endereço para entrega');
        return {
          type: 'CADASTRO_ERRO'
        }
      }

      if(!checkout.forma_pagamento){
        Alert.alert('Atenção', 'Escolha uma forma de pagamento');
        return {
          type: 'CADASTRO_ERRO'
        }
      }

      if(checkout.forma_pagamento == '1'){
        dispatch(loadFinalizarCadastro(true));
        dispatch(enviarCadastroParaApi(_this));
      }

      if(checkout.forma_pagamento == '2'){
        if(!checkout.cartao.titular){
          Alert.alert('Atenção', 'Digite o nome do titular do cartão');
          return {
            type: 'CADASTRO_ERRO'
          }
        }

        if(!checkout.cartao.numero){
          Alert.alert('Atenção', 'Digite o número do cartão');
          return {
            type: 'CADASTRO_ERRO'
          }
        }
        
        if(!checkout.cartao.cvv){
          Alert.alert('Atenção', 'Digite o código de segurança do cartão');
          return {
            type: 'CADASTRO_ERRO'
          }
        }
        
        AdyenCse.generateCSE(
          ADYEN_KEY,
          checkout.cartao.titular.toString(),
          checkout.cartao.numero.toString().replace(' ', ''),
          checkout.cartao.cvv.toString(),
          checkout.cartao.mes.toString(),
          checkout.cartao.ano.toString()
        )
        .then(encrypt => {
          dispatch(loadFinalizarCadastro(true));
          dispatch(enviarCadastroParaApi(_this, encrypt));
        })
        .catch(error => {
          Alert.alert('Atenção', 'Verifique os dados do seu cartão de crédito');
        });
      }
      
    }else{
      dispatch(loadFinalizarCadastro(true));
      dispatch(enviarCadastroParaApi(_this));
    }
    
  };

}

/**
 * Enviar um POST para carts/checkout com os parâmetros:
 * payment_method_id = 1 para Boleto ou 2 para Cartão de Crédito
 * Se o pagamento for com o cartão, enviar um array com os valores ['string_adyen', 'valor', 'installments_id'] -> O installment_id é o retorno do GET 'carts/installments/{value}'
 */
export const enviarCadastroParaApi = (_this, encrypt = '') => {
  let data = {};

  return (dispatch, getState) => {
    const checkout = getState().checkout;
    let data = {};

    if(checkout.factory == 1){
      data = {
        payment_method_id: checkout.forma_pagamento,
        address_id: checkout.address_id
      }
  
      if(encrypt != ''){
        data.cards = [{
          stringadyen: encrypt,
          value: checkout.total,
          installment_id:checkout.installment_id
        }];
      }
    }
    
    RequestAuth('carts/checkout', 'POST', data)
      .then(response => response.json())
      .then(response => {
        if(response.error){
          Alert.alert('Atenção', response.error.message);
          console.log(response);
          dispatch(loadFinalizarCadastro(false));
        }
        
        if(response.data.id){
          dispatch(loadFinalizarCadastro(false));
          _this.navigation.navigate('CadastroAgradecimento', {codigo: response.data.id});
        }

        dispatch(loadFinalizarCadastro(false));

        console.log('SUCESSO', response);
      })
      .catch(error => {
        Alert.alert('Ocorreu um erro ao gerar o pedido. Tente novamente mais tarde');
        dispatch(loadFinalizarCadastro(false));
        console.log(error);
      });
  }
}