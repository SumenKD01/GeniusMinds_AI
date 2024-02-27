import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Homepage from '../../Homepage/Homepage';

export default function Home() {
  return (
    <View className='flex-1 bg-slate-700'  >
      <Homepage/>

    </View>
  );
}
