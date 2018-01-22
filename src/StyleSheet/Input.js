const React = require("react-native");

const { StyleSheet, Platform, Dimensions } = React;
 
export default {
  inputText: {
    paddingVertical:10,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#d2d6e0',
    borderWidth: 1,
    borderRadius: 4
    
  },
  inputTextCadastro: {
    marginVertical:10,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#FFFFFF',
     borderColor: '#d2d6e0',
    borderWidth: 1,
    borderRadius: 4,
     
  },
  inputTextError: {
    marginVertical:10,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 4,
     
  },
  picker: {
    // O picker deve ser inserido dentro de uma view
    borderColor: '#d2d6e0',
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    flex: 1
  },
  boxinput:{
    backgroundColor:'#FFFFFF',
    height:50
  }
};
