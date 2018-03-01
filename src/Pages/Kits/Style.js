
import { Dimensions } from 'react-native';
import {
  verdeClaro,
  branco
} from '../../StyleSheet/Cores';

const dimensions = Dimensions.get('window');

export default {
  ContainerMain: {
    backgroundColor: '#FFFFFF'
  },
  TitleH1: {
    alignSelf:'center',
    color:'#FFFFFF',
    fontSize:18
  },
  TitleBox: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: "#000000",
    padding:10,
    borderRadius:5
  }, 
  GridBox: {
    borderColor: "#f0eced",
    borderWidth: 1,
    borderRadius:5, 
    margin:10,
    padding:10
  },
  TextSmall: {
    color:'#5c636a',
    fontSize:12
  }, 
  ContainerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: dimensions.width,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignSelf: 'stretch',alignItems:'center',justifyContent: 'center',
  },
  btnOutline: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red'
  },
  btnPrimary:{
    backgroundColor: verdeClaro,
  },
  btnPrimaryOutline: {
    backgroundColor: branco,
    borderRadius: 4,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1.7,
    borderColor: verdeClaro
  },
    btnPrimaryOutlineText: {
    color: verdeClaro,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
};