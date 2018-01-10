import React, { Component } from 'react';
import { Platform, AsyncStorage,Alert,Dimensions ,Animated} from 'react-native';

import {RequestPostAuth,ApiStatusCode,RequestGetAuth,RequestGet,RequestPost,URL_API} from '../../Helpers/Http' 

 export const changeLoading = (_value) => ({
		 type:'CHANGE_LOADING',
		 payload: _value
})

export const changeItem = (_object, _value) => ({
		 type:'CHANGE_FIELD_PRODUTO',
		 objectItem: _object,
		 payload: _value
})


export const listarProdutos = () => {
  
	
		 return (dispatch,getState) => 
	   {
	   	 const state = getState().produto;
       const URL = 'products?search='+state.search+'&page=' + state.actualPage;
       console.log(URL)

	   	if(!state.loading){
      	dispatch({ type:'CHANGE_FIELD_PRODUTO',objectItem: 'loading', payload: true })
       }
	   	dispatch({ type:'CHANGE_FIELD_PRODUTO',objectItem: 'showButtonLoading', payload: true })
	   	 /*
	   * @Listar produtos
	   */       
       RequestGet(URL)
		  .then(resp => resp.json())
		  .then(resp => {
         
			    dispatch({ type:'CHANGE_FIELD_PRODUTO',objectItem: 'lastPage', payload: resp.meta.last_page })
	        const stateUpdated = getState().produto;   
	         
	        if(stateUpdated.actualPage <= stateUpdated.lastPage){
	          let nextPage = stateUpdated.actualPage + 1;
	          
	          var a = stateUpdated.produtos;
	          
	          var novos = a.concat(resp.data)

            console.log(novos)
	          dispatch({ type:'CHANGE_FIELD_PRODUTO',objectItem: 'produtos', payload: novos })
	          dispatch({ type:'CHANGE_FIELD_PRODUTO',objectItem: 'actualPage', payload: nextPage })
	        
	         }else{

	           console.log('fim')
	           dispatch({ type:'CHANGE_FIELD_PRODUTO',objectItem: 'showButtonLoading', payload: false })
	            
	        }
             dispatch({ type:'CHANGE_FIELD_PRODUTO',objectItem: 'loading', payload: false })
          
	      
		  })
	   }

}

 /*ANIMAÇÃO DA BUSCA*/
 export const _onOpenInputSearch = (_props) => {  

      
       const dimensions = Dimensions.get('window');
       const imageWidth =  dimensions.width ;

			 return dispatch => 
			 {
			       dispatch(changeItem('opensearch', true))
			       Animated.timing( _props.slideAnim,            
									              {
									                toValue: imageWidth,                
									                duration: 500,    
									              }
									            ).start(); 
			}
  }


 export const _onClosedInputSearch = (_props) => { 

	  return dispatch => 
		 {
        dispatch({ type:'STATE_DEFAULT' })
        _props.listarProdutos()
     } 
  } 

export const searchRequestItem = async(_props) => { 
	 
   return dispatch => 
		 {   
 
          dispatch({ type:'STATE_SEARCH' })
        
           setTimeout(() => {
           	     _props.listarProdutos()
           }, 500)
          
     } 
  }


  /*DETAILS*/
  export const initDetails = async(_props) =>{
  	    const { produto } = _props;
        const produtoFirst = produto.product_details[0]
        
  	return dispatch => 
		 {
		 	  dispatch({ type:'CHANGE_FIELD_DETAILS',objectItem: 'imagemDestaque', payload: produtoFirst.medias[0].url })
		 	  dispatch({ type:'CHANGE_FIELD_DETAILS',objectItem: 'code', payload: produtoFirst.code })
		 	  dispatch({ type:'CHANGE_FIELD_DETAILS',objectItem: 'idDetails', payload: produtoFirst.id })
    }
  }

  export const onchangeitem = (_item) =>{
  	return dispatch => 
		 {
		   	dispatch({ type:'CHANGE_FIELD_DETAILS',objectItem: 'imagemDestaque', payload: _item.medias[0].url })
		 	  dispatch({ type:'CHANGE_FIELD_DETAILS',objectItem: 'code', payload: _item.code })
		 	  dispatch({ type:'CHANGE_FIELD_DETAILS',objectItem: 'idDetails', payload: _item.id })
		 }
	}

	export const incrementeQuantidade = () => {
    return (dispatch,getState) => 
		 {
		 	  const state = getState().produto;
        dispatch({ type:'CHANGE_FIELD_DETAILS',objectItem: 'quantidade', payload: state.details.quantidade + 1 })
		 }
	}

  export const decrementeQuantidade = () => {
  	 return (dispatch,getState) => 
		 {
		 	  const state = getState().produto;
        dispatch({ type:'CHANGE_FIELD_DETAILS',objectItem: 'quantidade', payload: state.details.quantidade > 1 ? state.details.quantidade - 1 : 1 })
		 }
  }

  export const addProduto = async() => {
     
     return (dispatch,getState) => 
		 {
        const state = getState().produto;
	      var data = {
	        product_detail_id: state.details.idDetails,
	        amount: state.details.quantidade
	      };
     
	      RequestPostAuth('carts/products',data)
	      .then(resp => resp.json())
		    .then(resp => {
		    	console.log(resp)
             Alert.alert('', 'Produto inserido com sucesso');
		    })
		    .catch(error => {
		    	 Alert.alert('', 'Erro ao adicionar o item ao carrinho!');
		    })
	      
		}
  }