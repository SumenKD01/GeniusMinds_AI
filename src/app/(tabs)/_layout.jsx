import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, View } from 'react-native';



export default function AppLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'cyan',
      tabBarInactiveTintColor: '001E3E',
      tabBarLabelStyle: {
        fontSize: 10,
      },
      tabBarStyle: {
        backgroundColor: '#1B3A77',
        height: 55,
        elevation: 0,
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 0,
        width: '100%'
      }
    })} >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) =>
            <>
              <View style={{ width: '50%', backgroundColor: color, height: 1, top: -10 }}></View>
              <Image source={require('../../../assets/icons/Home.png')} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
            </>
        }}
      />


      <Tabs.Screen
        // Name of the dynamic route.
        name="report"
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              <View style={{ width: '50%', backgroundColor: color, height: 1, top: -10 }}></View>
              <Image source={require('../../../assets/icons/business-report.png')} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
            </>),
        }}

      />
      <Tabs.Screen
        // Name of the dynamic route.
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              <View style={{ width: '50%', backgroundColor: color, height: 1, top: -10 }}></View>
              <Image source={require('../../../assets/icons/User.png')} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
            <View style={{width: '50%', backgroundColor: color, height: 1, top: -10}}></View>
            <Image source={require('../../../assets/icons/main-menu.png')} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
            </>
          ),
        }}

      />
    </Tabs>
  );
}