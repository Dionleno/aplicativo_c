import { Platform,NativeModules } from 'react-native';

if(Platform.OS === 'ios'){
    module.exports = NativeModules.AdyenIOS;
}else{
    module.exports = NativeModules.AdyenCse;
}
