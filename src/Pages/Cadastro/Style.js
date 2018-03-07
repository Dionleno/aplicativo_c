const React = require("react-native");

const { StyleSheet, Platform } = React;

export default {
  title: {
    backgroundColor: '#F7F7F8',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 12,
    justifyContent: 'space-between',
    marginBottom: 7.5
 },
  titleText: {
    fontSize: Platform.OS === "ios" ? 15 : 17,
    color: '#656D82',
    fontWeight: '500'
  },
  titleIconArrowDown: {
    fontSize: 28,
    color: '#7A9DE2'
  },
  StyleInputText: {
   width:'100%',height:60,padding:8
  },
  borderCard:{
    borderColor:'#1aff6e',
    borderWidth:15,
    shadowColor:'#1aff6e',
    borderRadius:0,
    shadowOpacity:1, 
    shadowRadius: 0,
    elevation: 1,
    margin:20
  },
  NoBorderCard:{ 
   margin:20
  },
  viewPicker: {
    backgroundColor: '#FFFFFF', 
    height:50, 
    flex: 1, 
    marginBottom: 15
  }
};
