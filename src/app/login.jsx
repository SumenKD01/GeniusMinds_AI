import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Login() {
  return (
    <View className='pt-24'>
         <Link href={{ pathname: '/home', params: { name: 'Bacon' } }}>Go to Details</Link>
      <Text>loginnfhnnnnnnnnnnnnnnnnnnnnnnnnnnn</Text>
    </View>
  )
}