import React from 'react';
import { Platform,TouchableOpacity} from 'react-native';
import { Radio } from 'native-base';
  import Icon from 'react-native-vector-icons/MaterialIcons';
const RadioPlataform = props => {

    if(Platform.OS === "ios"){
        return (
          <TouchableOpacity style={{}} onPress={props.actionClick}>
               <Icon name={ props.selected ? "radio-button-checked" : "radio-button-unchecked"} style={{fontSize:18,marginRight:8,color:"#656D82"}}/>
          </TouchableOpacity>
          )
    }else{
        return (
            <Radio 
                  onPress={props.actionClick}
                  selected={props.selected}
                  style={props.styles}
             />
          )
    }
 
};

export default RadioPlataform;
