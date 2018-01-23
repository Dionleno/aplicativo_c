/**
 * Reducers da tela de Checkout
 */

const INITIAL_STATE = {
  enderecos: [],
  formas_entrega: [],
  address_id: '',
  frete: '',
  forma_pagamento: '',
  produtos: [],
  parcelas: [{key: 0, label: 'Aguarde...'}],
  total: 0,
  total_diff: 0,
  factory: -1,
  overlay: false,
  kit: {
    titulo: '',
    descricao: '',
    valor: '',
    imagem: 'https://contem1gbeauty.com.br/img/produtos/002666_2_g.jpg',
    pontos: ''
  },
  cartao: {
    titular: 'Diego Galdino Jaldim',
    numero: '4111 1111 1111 1111',
    cvv: '737',
    installment_id: 0,
    mes: ((new Date().getMonth())+1),
    ano: (new Date().getFullYear()),
    total: 0
  },
  cards: [],
  cards_label: [],
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

    case 'CARTAO_TOTAL':
      return {...state, cartao: {...state.cartao, total: action.payload}};

    case 'ADD_CARD':
      return {...state, cards: [...state.cards, action.payload] };

    case 'ADD_CARD_LABEL':
      return {...state, cards_label: [...state.cards_label, action.payload] };

    case 'RENEW_CARD':
      return {...state, cards: [...state.cards] };

    case 'RENEW_CARD_LABEL':
      return {...state, cards_label: [...state.cards_label] };

    case 'FORMA_PAGAMENTO':
      return {...state, forma_pagamento: action.payload};
    
    case 'PRODUTOS':
      return {...state, produtos: action.payload};

    case 'KIT':
      return {...state, kit: action.payload};
    
    case 'TOTAL':
      return {...state, total: action.payload};
    
    case 'TOTAL_DIFF':
      return {...state, total_diff: action.payload};
    
    case 'PARCELAS':
      return {...state, parcelas: action.payload};
    
    case 'INSTALLMENT_ID':
      return {...state, cartao: {...state.cartao, installment_id: action.payload }};

    case 'LOAD_FINALIZAR_CADASTRO':
      return {...state, loading: {...state.loading, btnFinalizarCadastro: action.payload }};

    case 'FACTORY':
      return {...state, factory: action.payload};
    
    case 'LOAD_FORMAS_ENTREGA':
      return {...state, loading: {...state.loading, formasEntrega: action.payload }};

    case 'LOAD_OVERLAY':
      return {...state, overlay: action.payload};

    default:
      return state;

  }

}

