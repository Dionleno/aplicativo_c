/**
 * Reducers da tela de Checkout
 */

const INITIAL_STATE = {
  enderecos: [],
  formas_entrega: [],
  address_id: '',
  installment_id: '',
  frete: '',
  forma_pagamento: '',
  produtos: [],
  parcelas: [{key: 0, label: 'Aguarde...'}],
  total: 0,
  factory: -1,
  kit: {
    titulo: '',
    descricao: '',
    valor: '',
    imagem: 'https://contem1gbeauty.com.br/img/produtos/002666_2_g.jpg',
    pontos: ''
  },
  cartao: {
    titular: '',
    numero: '',
    cvv: '',
    mes: ((new Date().getMonth())+1),
    ano: (new Date().getFullYear())
  },
  loading: {
    btnFinalizarCadastro: false,
    formasEntrega: 0
  }
};

export default (state = INITIAL_STATE, action) => {
  
  switch(action.type){
    
    case 'LISTAR_ENDERECOS':
      return {...state, enderecos: action.payload};

    case 'CHANGE_ADDRESS':
      return {...state, address_id: action.payload};

    case 'FORMAS_ENTREGA':
      return {...state, formas_entrega: action.payload};

    case 'CHANGE_FRETE':
      return {...state, frete: action.payload};

    case 'CARTAO_TITULAR':
      return {...state, cartao: {...state.cartao, titular: action.payload}};
    
    case 'CARTAO_NUMERO':
      return {...state, cartao: {...state.cartao, numero: action.payload}};

    case 'CARTAO_CVV':
      return {...state, cartao: {...state.cartao, cvv: action.payload}};

    case 'CARTAO_MES':
      return {...state, cartao: {...state.cartao, mes: action.payload}};

    case 'CARTAO_ANO':
      return {...state, cartao: {...state.cartao, ano: action.payload}};

    case 'FORMA_PAGAMENTO':
      return {...state, forma_pagamento: action.payload};
    
    case 'PRODUTOS':
      return {...state, produtos: action.payload};

    case 'KIT':
      return {...state, kit: action.payload};
    
    case 'TOTAL':
      return {...state, total: action.payload};

    case 'PARCELAS':
      return {...state, parcelas: action.payload};
    
    case 'INSTALLMENT_ID':
      return {...state, installment_id: action.payload};

    case 'LOAD_FINALIZAR_CADASTRO':
      return {...state, loading: {...state.loading, btnFinalizarCadastro: action.payload }};

    case 'FACTORY':
      return {...state, factory: action.payload};
    
    case 'LOAD_FORMAS_ENTREGA':
      return {...state, loading: {...state.loading, formasEntrega: action.payload }};

    default:
      return state;

  }

}

