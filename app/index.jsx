import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Login from '../src/LoginPage/Login';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import Homepage from '../src/Homepage/Homepage';

export default Home = () => {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Homepage />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

