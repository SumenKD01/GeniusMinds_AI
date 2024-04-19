import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Login from '../LoginPage/Login';
import { store } from '../redux/store';


export default function Root() {
  return (  
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Login />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
