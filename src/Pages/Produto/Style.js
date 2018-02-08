
import { Dimensions } from 'react-native';
  
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width  * 9 / 16);
const imageWidth = dimensions.width;

export default{
 listSubCategoria:{marginLeft:0,paddingLeft:10},
  content: {
    margin: 5,

  },  StyleInputText: {
       width:'100%',height:40
    },
  viewBtnCarregarMaisProdutos: {
    marginHorizontal: 10,
    marginBottom: 10
  },
  btnRemoveActive:{
     marginHorizontal:3,backgroundColor:'red',justifyContent: 'center',alignSelf:"center"
  },
  btnActive:{
    marginHorizontal:1,backgroundColor:'#d4d4d4',width:40,height:38,justifyContent: 'center',alignItems:"center"
  },
  btnInative:{
    width:40,height:38,marginHorizontal:1,backgroundColor:'transparent',justifyContent: 'center',alignItems:"center"
  }
  };