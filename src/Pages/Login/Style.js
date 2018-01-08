const React = require("react-native");

const { StyleSheet, Platform ,Dimensions} = React;
 const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width  * 9 / 16);
const imageWidth = dimensions.width;
export default {
 TitleH1: {
      alignSelf:'center',
      color:'#FFFFFF',
      fontSize:18
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
     btnPrimary: {
      backgroundColor: '#20CDA6',
      borderRadius: 4,
      paddingHorizontal: 20,
      alignItems: 'center'
    }
};
