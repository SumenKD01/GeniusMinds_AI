import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Login from '../LoginPage/Login';
import { store } from '../redux/store';


export default function Root() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ backgroundColor: 'blue', flex: 1 }}  >
        <View style={styles.container}>
          <Login />
        </View>
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
