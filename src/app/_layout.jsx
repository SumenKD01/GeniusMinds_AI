import { Slot } from "expo-router";
import {View,Text} from 'react-native'
import "../../global.css";

export default function _layout(){
  return(
    <View>
      <Slot/>
    </View>
  )
}



