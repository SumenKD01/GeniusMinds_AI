import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from "expo-router";

export default function Home() {
  return (
    <View   className='flex-1 bg-red-500 pt-10' >
      <Text className='bg-fuchsia-800'>Hi hell hor nvjfnvjdfnkjvno, Main Hu Jian, Main hu bada Takatwar!</Text>
      <StatusBar style='auto' backgroundColor='red'/>
    </View>
  );

}
