import { Alert, Dimensions, Animated} from 'react-native';
import { RequestPostAuth, RequestGetAuth, RequestGet } from '../../Helpers/Http';
import { SEM_FOTO } from '../../Helpers/Constants';
import {
	LISTS_PRODUCTO,
	CHANGE_FIELD_PRODUTO,
	STATE_DEFAULT,
	STATE_SEARCH,
	CHANGE_FIELD_DETAILS,
	ADD_PRODUTO_LOADING
} from '../../Types';

export const changeItem = (_object, _value) => ({
	type: CHANGE_FIELD_PRODUTO,
	objectItem: _object,
	payload: _value
})

export const listarProdutosCategoria = () => {
	
	return (dispatch, getState) => {
		const state = getState().produto;
		let slug = state._slug || 'geral';
		const URL = `/categories/${slug}/products?page=${state.actualPage}`;

		if(!state.loading){
			dispatch({ type: CHANGE_FIELD_PRODUTO, objectItem: 'loading', payload: true })
		}

		/*
		* @Listar produtos
		*/       
		RequestGetAuth(URL)
			.then(resp => resp.json())
			.then(resp => {
				dispatch({ type: CHANGE_FIELD_PRODUTO, objectItem: 'lastPage', payload: resp.meta.last_page })
				const stateUpdated = getState().produto;   

				dispatch({ type: CHANGE_FIELD_PRODUTO, objectItem: 'showButtonLoading', payload: true })
				if(stateUpdated.actualPage <= stateUpdated.lastPage){
					let nextPage = stateUpdated.actualPage + 1;

					var a = stateUpdated.produtos;

					var novos = a.concat(resp.data)

					console.log(novos)
					dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'produtos', payload: novos })
					dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'actualPage', payload: nextPage })

				}else{
					console.log('fim')
					dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'showButtonLoading', payload: false })
				}

				dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'loading', payload: false });
		})
	}

}

export const listarProdutos = () => {

	return (dispatch, getState) => {
		const state = getState().produto;
		const URL = `products?search=${state.search}&page=${state.actualPage}`;

		if(!state.loading){
			dispatch({ type: CHANGE_FIELD_PRODUTO, objectItem: 'loading', payload: true});
		}

		RequestGetAuth(URL)
			.then(resp => resp.json())
			.then(resp => {
				try {
					dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'lastPage', payload: resp.meta.last_page });
					const stateUpdated = getState().produto;   

					dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'showButtonLoading', payload: true })
					if(stateUpdated.actualPage <= stateUpdated.lastPage){
						let nextPage = stateUpdated.actualPage + 1;

						var a = stateUpdated.produtos;

						var novos = a.concat(resp.data);

						console.log(novos)
						dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'produtos', payload: novos });
						dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'actualPage', payload: nextPage });

					}else{

					console.log('fim')
					dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'showButtonLoading', payload: false })

					}
					dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'loading', payload: false }); 
				} catch (error) {
					dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'loading', payload: false }); 
					dispatch({ type: CHANGE_FIELD_PRODUTO,objectItem: 'informacao', payload: 'Nenhum produto a ser carregado' }); 
					console.log('PRODUTOS_ERRO', resp);
				}
			});
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
			dispatch({ type: STATE_DEFAULT })
			_props.listarProdutos()
		} 
} 

export const searchRequestItem = async(_props) => { 
	
	return dispatch => 
		{   

				dispatch({ type: STATE_SEARCH })
			
					setTimeout(() => {
								_props.listarProdutos()
					}, 500)
				
		} 
}


/*DETAILS*/
export const initDetails = (_props) =>{
	const { produto } = _props;
	const produtoFirst = produto.product_details[0];
	let url = SEM_FOTO;

	try{
		url = produtoFirst.medias[0].url;
	}catch(e){}

	return dispatch => {
		dispatch({ type: CHANGE_FIELD_DETAILS, objectItem: 'quantidade', payload: 1 })
		dispatch({ type: CHANGE_FIELD_DETAILS, objectItem: 'imagemDestaque', payload: url })
		dispatch({ type: CHANGE_FIELD_DETAILS, objectItem: 'code', payload: produtoFirst.code })
		dispatch({ type: CHANGE_FIELD_DETAILS, objectItem: 'idDetails', payload: produtoFirst.id })
	}
}

export const onchangeitem = (_item) =>{
	return dispatch => 
		{
			dispatch({ type: CHANGE_FIELD_DETAILS, objectItem: 'imagemDestaque', payload: _item.medias[0].url })
			dispatch({ type: CHANGE_FIELD_DETAILS, objectItem: 'code', payload: _item.code })
			dispatch({ type: CHANGE_FIELD_DETAILS, objectItem: 'idDetails', payload: _item.id })
		}
}

export const incrementeQuantidade = () => {
	return (dispatch,getState) => 
		{
			const state = getState().produto;
			dispatch({ type: CHANGE_FIELD_DETAILS,objectItem: 'quantidade', payload: state.details.quantidade + 1 })
		}
}

export const decrementeQuantidade = () => {
		return (dispatch,getState) => 
		{
			const state = getState().produto;
			dispatch({ type: CHANGE_FIELD_DETAILS,objectItem: 'quantidade', payload: state.details.quantidade > 1 ? state.details.quantidade - 1 : 1 })
		}
}

export const loadAddProduto = value => {
	return {
		type: ADD_PRODUTO_LOADING,
		payload: value
	}
}

export const addProduto = () => {
		
	return (dispatch, getState) => {
		const state = getState().produto;

		var data = {
			product_detail_id: state.details.idDetails,
			amount: state.details.quantidade
		};
		
		dispatch(loadAddProduto(true));
		console.log(data)

		RequestPostAuth('carts/products', data)
			.then(resp => resp.json())
			.then(resp => {
			
				if(resp.error){
					
					dispatch({ type: CHANGE_FIELD_DETAILS, objectItem: 'quantidade', payload: 1});
					Alert.alert('', resp.error.message);
					dispatch(loadAddProduto(false));
					return;
				}
				
				if(resp.data){
					dispatch({ type: CHANGE_FIELD_DETAILS, objectItem: 'quantidade', payload: 1});
					Alert.alert('', 'Produto inserido com sucesso');
					dispatch(loadAddProduto(false));
					return;
				}

				if(resp.message){
					Alert.alert('', resp.message);
				  dispatch(loadAddProduto(false));
				}
			})
			.catch(error => {
				Alert.alert('', 'Erro ao adicionar o item ao carrinho!');
				dispatch(loadAddProduto(false));
			});
	}
}