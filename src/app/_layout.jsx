import {View,Text} from 'react-native'
import React,{useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


import { useFonts,Inter_900Black } from 'expo-font';
import {AmaticSC_400Regular,AmaticSC_700Bold,} from 'expo-font'
import "../../global.css";
import { Stack } from 'expo-router';

import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();

export default function RootLayout(){

  const [fontsLoaded,fontError]=useFonts({
    Inter:Inter_900Black,
    Amatic:AmaticSC_400Regular,
    AmaticBold:AmaticSC_700Bold
  });

  useEffect(()=>{
    if(fontsLoaded || fontError){
      SplashScreen.hideAsync()
    }
  },[fontsLoaded,fontError]);

  if(!fontsLoaded && !fontError){
    return null;
  }

  return(
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name='index' options={{title:"Home"}}/>
    </Stack>

  )
}



  



