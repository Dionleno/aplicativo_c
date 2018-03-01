const React = require("react-native");

const { StyleSheet, Platform ,Dimensions} = React;
import { verdeClaro } from '../../StyleSheet/Cores';


const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width  * 9 / 16);
const imageWidth = dimensions.width;
const branco = '#FFFFFF';

export default {
  H3: {
    alignSelf: 'center',alignItems:'center',justifyContent: 'center',
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
     } ,
    ContainerMain: {
      paddingBottom:20,
      backgroundColor:'#FFFFFF'
    },
    TitleH1: {
      alignSelf:'flex-end',
      padding:5,
      paddingHorizontal:15,
      paddingBottom:0,
      color:'#FFFFFF',
      fontSize:16
     },
     TextSmall: {
      color:'#5c636a',
      fontSize:12
    },
    btnOutline: {
      width:100,
      height:100,
      backgroundColor: '#FFFFFF',
      borderRadius: 100,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderWidth: 1.7,alignSelf: 'center',justifyContent: 'center',
      borderColor: verdeClaro
    },
      btnPrimary: {
        backgroundColor: verdeClaro,
        borderRadius: 4,
        paddingHorizontal: 20,
        alignItems: 'center'
      },
  }
