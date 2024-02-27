import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View,Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './login';


export default function Root() {
  return (
    <SafeAreaView style={{backgroundColor:'blue', flex:1}}  >
      <Text style={{color:'red'}} className='bg-gray-600'>Home</Text>
      <Login/>
      <StatusBar style='auto' backgroundColor='red'/>

      </SafeAreaView>

  )
}
