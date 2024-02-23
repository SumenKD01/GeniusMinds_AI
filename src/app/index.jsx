import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../login/login';

export default function Home() {
  return (
    <View style={{ paddingTop: 40 }} className='bg-emerald-500'>
      <View className='flex-2'>
        <Text className='flex-3 ' >Open up App.js2 to start working How  Hello      njbjjhvhjvbj bj on your app!</Text>
      </View>
      <View className='flex-2'>
        <Text className='bg-color-red'>Open up App.js2 to start working How  Hello      njbjjhvhjvbj bj on your app!</Text>
      </View>
      <Login />
    </View>
  );
}


