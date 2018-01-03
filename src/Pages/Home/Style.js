
import { Dimensions } from 'react-native';
  
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width  * 9 / 16);
const imageWidth = dimensions.width;

export default{

    BackgroundView: {
       flex: 1,
       alignItems: 'center',
       backgroundColor: '#000000',
       flexDirection: 'row',
       justifyContent: 'center',
    },
    ContainerView: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: dimensions.width,
            height: '100%',
            backgroundColor: 'rgba(255,255,255,0.75)',
            alignSelf: 'stretch'
     }
  };