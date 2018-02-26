export default {
  view:{
    backgroundColor: 'rgba(255,255,255,0)',
    flexDirection: 'column'
	},
	viewCheckbox: {
		flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
	},
	viewImage: {
    flex: 0.25
  },
  textStyle: {
    flex: 0.60,
  },
  imageStyle: {
    flex: 1,
  },
	textProductName: {
		textAlign: 'left',
		alignSelf: 'stretch',
		fontSize: 16
	},
	textPrice: {
		color: '#2e2f30',
		fontSize: 14,
		textAlign: 'left',
		alignSelf: 'stretch',
		marginTop: 3,
		paddingTop: 3,
		borderTopColor: '#7f7f7f',
		borderTopWidth: 0.5
	},
	textQuantidade: {
		color: '#2e2f30',
		fontSize: 14,
		textAlign: 'left',
		alignSelf: 'stretch',
		marginTop: 3
	},
  carrinhoItemInfo: {
    backgroundColor: '#f3d25e',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    alignSelf: 'stretch',
    borderRadius: 3
  },
  produtoIndisponivel: {
    backgroundColor: 'rgba(255,255,255, 0.6)', 
    flex: 1,
    zIndex: 10,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  footer: {
    padding: 10,
    // backgroundColor: '#F00'
  }
};